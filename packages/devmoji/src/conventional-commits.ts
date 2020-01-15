import { Devmoji } from "./devmoji"
import chalk from "chalk"
import { Cli } from "./cli"

export class ConventionalCommits {
  regexCommit = /^(?<type>:?[a-z-]+)(?:\((?<scope>[a-z-]+)\))?:\s*(?::(?<other>[a-z-]+):\s*)?/gm
  regexLog = /(?<type>:?[a-z-]+)(?:\((?<scope>[a-z-]+)\))?:\s*(?::(?<other>[a-z-]+):\s*)?/gm

  constructor(public devmoji: Devmoji) {}

  formatCommit(text: string) {
    return this.format(text, this.regexCommit)
  }

  formatLog(text: string) {
    return this.format(text, this.regexLog)
  }

  formatEmoji(type: string, scope?: string, other?: string) {
    let typeMoji = this.devmoji.config.pack.get(type)
    let scopeMoji
    if (scope) {
      const typeScopeMoji = this.devmoji.config.pack.get(`${type}-${scope}`)
      if (typeScopeMoji) typeMoji = typeScopeMoji
      else scopeMoji = this.devmoji.config.pack.get(scope)
    }
    const ret: string[] = []
    ;[typeMoji?.emoji, scopeMoji?.emoji, other].map(code => {
      if (code) {
        const emoji = this.devmoji.get(code)
        if (!ret.includes(emoji)) ret.push(emoji)
      }
    })
    return ret.join(" ")
  }

  format(text: string, regex: RegExp) {
    text = this.devmoji.devmojify(text)
    return this.devmoji.emojify(
      text.replace(
        regex,
        (match, type: string, scope: string, other: string) => {
          if (type.startsWith(":")) return match
          const emoji = this.formatEmoji(type, scope, other)
          if (!emoji.length) return match
          let ret = type
          if (scope) ret += Cli.chalk(`(${scope})`, chalk.bold)
          ret += ":"
          ret = Cli.chalk(ret, chalk.grey)
          return ret + ` ${emoji} `
        }
      )
    )
  }
}
