import { Config } from "./config"
import { github, gitmoji } from "./emoji-pack"

export class Devmoji {
  shortcodeRegex = /:([a-zA-Z0-9_\-+]+):/g
  unicodeRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

  constructor(public config: Config) {}

  get(code: string): string {
    const ret = this.config.pack.get(code)
    if (ret) return this.get(ret.emoji)
    return github.get(code)?.emoji ?? github.wrap(code)
  }

  getDevmoji(type: string, scope?: string) {
    if (scope) {
      const ret = this.config.pack.get(`${type}-${scope}`)
      if (ret) return this.get(ret.emoji)
    }
    return this.get(type)
  }

  emojify(text: string): string {
    return text.replace(this.shortcodeRegex, (match, code) => {
      return this.get(code)
    })
  }

  demojify(text: string): string {
    return text.replace(this.unicodeRegex, s => {
      return github.wrap(github.getCode(s) ?? text)
    })
  }

  devmojify(text: string): string {
    text = this.demojify(text)
    return text.replace(this.shortcodeRegex, (match, code) => {
      const unicode = github.get(code)?.emoji
      if (unicode) {
        const codes = [
          ...(gitmoji.getCodes(unicode) || []),
          ...(github.getCodes(unicode) || []),
        ]
        for (const c of codes) {
          const ret = this.config.pack.getCode(c.code)
          if (ret) return ret
        }
      }
      return match
    })
  }
}
