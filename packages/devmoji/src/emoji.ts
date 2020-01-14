import * as emojis from "./data/github.emoji.json"
import * as gitmojis from "./data/gitmoji.emoji.json"

class Emoji {
  codes = new Map<string, string>()
  emojis = new Map<string, string[]>()

  constructor() {
    for (const [code, emoji] of Object.entries(emojis)) {
      this.codes.set(this.wrap(code), emoji)
      this.emojis.set(emoji, [
        ...(this.emojis.get(emoji) || []),
        this.wrap(code),
      ])
    }
    // Make sure the shortcodes for gitmojis are the first ones in the list
    for (const { emoji, code } of gitmojis.gitmojis) {
      const codes = new Set(this.getCodes(emoji))
      codes.delete(code)
      this.emojis.set(emoji, [code, ...codes])
    }
  }

  wrap(code: string) {
    return code.startsWith(":") ? code : `:${code}:`
  }

  unwrap(code: string) {
    return code.startsWith(":") ? code.slice(1, code.length - 1) : code
  }

  getCodes(emoji: string): string[] {
    return this.emojis.get(emoji) || [emoji]
  }

  getCode(emoji: string): string {
    return this.getCodes(emoji)[0]
  }

  get(code: string): string {
    code = this.wrap(code)
    return this.codes.get(code) || code
  }
}

export const emoji = new Emoji()
