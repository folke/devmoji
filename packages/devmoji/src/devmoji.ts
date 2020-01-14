import { Config } from "./config"
import { emoji } from "./emoji"

export class Devmoji {
  shortcodeRegex = /:([a-zA-Z0-9_\-+]+):/g
  unicodeRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

  constructor(public config: Config) {}

  get(code: string): string {
    const ret = this.config.codes.get(code)
    if (ret) return this.get(ret.emoji)
    return emoji.get(code)
  }

  emojify(text: string): string {
    return text.replace(this.shortcodeRegex, (match, code) => {
      return this.get(code)
    })
  }

  demojify(text: string): string {
    return text.replace(this.unicodeRegex, s => {
      return emoji.getCode(s)
    })
  }

  devmojify(text: string): string {
    text = this.demojify(text)
    return text.replace(this.shortcodeRegex, (match, code) => {
      const unicode = emoji.get(code)
      const codes = emoji.getCodes(unicode)
      for (const c of codes) {
        const ret = this.config.emojis.get(emoji.unwrap(c))
        if (ret) return `:${ret.code}:`
      }
      return match
    })
  }
}
