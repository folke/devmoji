import chalk from "chalk"
import { Command } from "commander"
import * as fs from "fs"
import * as path from "path"
import * as readline from "readline"
import { Config } from "./config"
import { ConventionalCommits } from "./conventional-commits"
import { Devmoji } from "./devmoji"

export class Cli {
  commits: ConventionalCommits
  opts: { [key: string]: string | boolean | undefined }
  static color = true

  constructor(public program: Command, public devmoji: Devmoji) {
    this.commits = new ConventionalCommits(devmoji)
    this.opts = program.opts()
  }

  format(
    text: string,
    format = "unicode",
    processCommit = false,
    processLog = false
  ) {
    if (processCommit && !processLog) text = this.commits.formatCommit(text)
    if (processLog) text = this.commits.formatLog(text)
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
    console.log(Cli.chalk("Available Devmoji", chalk.grey.dim.underline))
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
        Cli.chalk(`:${code.code}:`.padEnd(15), chalk.blue),
        Cli.chalk(cc, chalk.green) + code.description
      )
    }
  }

  static chalk(text: string, chalk: chalk.Chalk) {
    if (process.env.NODE_ENV == "test" || process.env.JEST_WORKER_ID)
      return text
    return Cli.color ? chalk.call(chalk, text) : text
  }

  error(msg: string) {
    console.error(Cli.chalk("[error] ", chalk.red) + msg)
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
      .option("-c|--config <file>", "location of the devmoji.config.js file")
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
        "--commit",
        "automatically add a devmoji to the conventional commit header",
        true
      )
      .option("--no-commit", "do not process conventional commit headers")
      .option(
        "-e|--edit",
        "read last commit message from .git/COMMIT_EDITMSG in the git root"
      )
      .option("--log", "format conventional commits in text similar to git log")
      .option(
        "--color",
        "use colors for formatting. Colors are enabled by default, unless output is piped to another command",
        process.stdout.isTTY
      )
      .option("--no-color", "don't use colors")
      .version(require("../../../package.json").version, "--version")
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
            this.format(line, opts.format, opts.commit && firstLine, opts.log)
          )
          firstLine = false
        } catch (err) {
          this.error(err)
        }
      })
      return
    }
    this.program.outputHelp()
    return process.exit(1)
  }
}

export function run(argv = process.argv) {
  Cli.create(argv).then(cli => cli.run())
}

if (module === require.main) {
  run()
}
