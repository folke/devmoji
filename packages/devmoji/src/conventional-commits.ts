import { Devmoji } from "./devmoji"

export class ConventionalCommits {
  constructor(public devmoji: Devmoji) {}

  formatCommit(text: string) {
    const regex = /^(?<type>:?[a-z-]+)(?:\((?<scope>[a-z-]+)\))?:\s*/gm
    text = this.devmoji.devmojify(text)
    return this.devmoji.emojify(
      text.replace(regex, (match, type, scope) => {
        const code = this.devmoji.getDevmoji(type, scope)
        if (!code.startsWith(":")) {
          return `${match}${code} `
        }
        return match
      })
    )
  }

  formatLog(text: string) {
    const regex = /(?<type>:?[a-z-]+)(?:\((?<scope>[a-z-]+)\))?:\s*(?::(?<other>[a-z-]+):)?/gm
    text = this.devmoji.devmojify(text)
    return this.devmoji.emojify(
      text.replace(
        regex,
        (match, type: string, scope: string, other: string) => {
          const code = this.devmoji.getDevmoji(type, scope)
          if (!code.startsWith(":")) {
            if (other && this.devmoji.get(other) == code) return match
            let ret = type
            if (scope) ret += `(${scope})`
            ret += `: ${code} `
            if (other) ret += `:${other}:`
            return ret
          }
          return match
        }
      )
    )
  }
}
