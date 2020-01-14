import { Config } from "./config"
import { Command } from "commander"
import readline = require("readline")
import { Devmoji } from "./devmoji"
import chalk from "chalk"
import { ConventionalCommits } from "./conventional-commits"
import * as path from "path"
import * as fs from "fs"

export class Cli {
  commits: ConventionalCommits
  constructor(public program: Command, public devmoji: Devmoji) {
    this.commits = new ConventionalCommits(devmoji)
  }

  format(
    text: string,
    format = "unicode",
    processCommit = false,
    processLog = false,
    color = false
  ) {
    if (processCommit && !processLog) text = this.commits.formatCommit(text)
    if (processLog) text = this.commits.formatLog(text, color)
    switch (format) {
      case "unicode":
        return this.devmoji.emojify(text)
      case "shortcode":
        return this.devmoji.demojify(text)
      case "devmoji":
        return this.devmoji.devmojify(text)
    }
    throw `Invalid format '${format}'`
  }

  list() {
    console.log(chalk.magenta.underline("all configured devmoji"))
    for (const code of this.devmoji.config.pack.codes.values()) {
      let cc = ""
      if (this.devmoji.config.options.types.includes(code.code)) {
        cc = `${code.code}: `
      }
      if (code.code.includes("-")) {
        const [type, scope] = code.code.split("-")
        if (this.devmoji.config.options.types.includes(type)) {
          cc = `${type}(${scope}): `
        }
      }
      console.log(
        this.devmoji.get(code.emoji),
        " ",
        chalk.blue(`:${code.code}:`.padEnd(15)),
        chalk.green(cc) + code.description
      )
    }
  }

  error(msg: string) {
    console.error(chalk.red("[error] ") + msg)
    process.exit(1)
  }

  gitRoot(cwd = process.cwd()): string | undefined {
    if (cwd == "/") return undefined
    const p = path.posix.resolve(cwd, "./.git")
    if (fs.existsSync(p) && fs.lstatSync(p).isDirectory()) return p
    return this.gitRoot(path.resolve(cwd, "../"))
  }

  static async create(argv = process.argv, exitOverride = false) {
    const program = new Command()
    if (exitOverride) program.exitOverride()
    program
      .version(require("../../../package.json").version)
      .option("-g|--config <file>", "location of the devmoji.config.js file")
      .option("-l|--list", "list all known devmojis")
      .option(
        "-t|--text <text>",
        "text to format. reads from stdin when omitted"
      )
      .option(
        "-f|--format <format>",
        "format should be one of: unicode, shortcode, devmoji",
        "unicode"
      )
      .option(
        "-c|--commit",
        "automatically add a devmoji to the conventional commit header",
        true
      )
      .option(
        "-C|--no-commit",
        "do not process conventional commit headers",
        true
      )
      .option(
        "--color",
        "color the conventional commit header when formatting git logs"
      )
      .option("--log", "format conventional commits in text similar to git log")
      .option(
        "-e|--edit",
        "read last commit message from the specified file or fallbacks to ./.git/COMMIT_EDITMSG"
      )
      .parse(argv)
    // console.log(program.opts())
    const config = await Config.load(program.config)
    return new Cli(program, new Devmoji(config))
  }

  run() {
    const opts = this.program.opts()
    if (opts.list) return this.list()

    if (opts.text)
      return console.log(
        this.format(opts.text, opts.format, opts.commit, opts.log)
      )

    if (opts.edit) {
      let commitMsgFile = this.gitRoot()
      if (commitMsgFile) {
        commitMsgFile = path.resolve(commitMsgFile, "COMMIT_EDITMSG")
      }
      if (commitMsgFile && fs.existsSync(commitMsgFile)) {
        let text = fs.readFileSync(commitMsgFile, "utf-8")
        text = this.format(text, opts.format, opts.commit)
        fs.writeFileSync(commitMsgFile, text, "utf-8")
        return console.log(text)
      } else {
        this.error("Couldn't find .git/COMMIT_EDITMSG")
      }
      return
    }

    if (!process.stdin.isTTY) {
      const rl = readline.createInterface({
        input: process.stdin,
        terminal: false,
      })

      let firstLine = true
      rl.on("line", line => {
        try {
          console.log(
            this.format(
              line,
              opts.format,
              opts.commit && firstLine,
              opts.log,
              opts.color
            )
          )
          firstLine = false
        } catch (err) {
          this.error(err)
        }
      })
      return
    }
    console.log("foo")
    this.program.outputHelp()
    // return process.exit(1)
  }
}

export function run(argv = process.argv) {
  Cli.create(argv).then(cli => cli.run())
}

if (module === require.main) {
  run()
}
