import { Devmoji } from "./devmoji"
import chalk from "chalk"

export class ConventionalCommits {
  regex = /(?<type>:?[a-z-]+)(?:\((?<scope>[a-z-]+)\))?(!?):\s*(?:(?<other>(?::[a-z-]+:\s*)+)\s*)?/gm
  constructor(public devmoji: Devmoji) {}

  formatCommit(text: string) {
    return this.format(text, true)
  }

  formatLog(text: string) {
    return this.format(text, false)
  }

  formatEmoji(type: string, scope?: string, other?: string, breaking = false) {
    let typeMoji = this.devmoji.config.pack.get(type)
    let scopeMoji
    if (scope) {
      const typeScopeMoji = this.devmoji.config.pack.get(`${type}-${scope}`)
      if (typeScopeMoji) typeMoji = typeScopeMoji
      else scopeMoji = this.devmoji.config.pack.get(scope)
    }

    const input = [
      breaking ? "boom" : undefined,
      typeMoji?.emoji,
      scopeMoji?.emoji,
    ]

    if (other) {
      let match
      do {
        match = this.devmoji.shortcodeRegex.exec(other)
        if (match) {
          input.push(match[1])
        }
      } while (match)
    }

    const ret: string[] = []
    input.map(code => {
      if (code) {
        const emoji = this.devmoji.get(code)
        if (!ret.includes(emoji)) ret.push(emoji)
      }
    })
    return ret.join(" ")
  }

  format(text: string, firstOnly = false) {
    text = this.devmoji.devmojify(text)
    return this.devmoji.emojify(
      text.replace(
        this.regex,
        (
          match,
          type: string,
          scope: string,
          breaking: string,
          other: string,
          offset: number
        ) => {
          if (firstOnly && offset > 0) return match
          if (type.startsWith(":")) return match
          const emoji = this.formatEmoji(
            type,
            scope,
            other,
            breaking ? true : false
          )
          if (!emoji.length) return match
          let ret = type
          if (scope) ret += chalk.bold(`(${scope})`)
          if (breaking) ret += "!"
          ret += ":"
          ret = chalk.blue(ret)
          ret = ret + ` ${emoji}`
          const ws = match.search(/\s*$/)
          if (ws > 0) ret += match.substring(ws)
          return ret
        }
      )
    )
  }
}
