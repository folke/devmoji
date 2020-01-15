import emojis from "./data/github.emoji"
import gitmojis from "./data/gitmoji.emoji"

export type TEmoji = { code: string; emoji: string; description?: string }

export class EmojiPack {
  codes = new Map<string, TEmoji>()
  emojis = new Map<string, TEmoji[]>()

  add(def: TEmoji) {
    def.code = this.unwrap(def.code)
    this.codes.set(def.code, def)
    this.emojis.set(def.emoji, [...(this.emojis.get(def.emoji) || []), def])
  }

  wrap(code: string) {
    return code.startsWith(":") ? code : `:${code}:`
  }

  unwrap(code: string) {
    return code.replace(/^:|:$/g, "")
  }

  getCodes(emoji: string) {
    return this.emojis.get(emoji)
  }

  getCode(emoji: string) {
    const codes = this.getCodes(emoji)
    return codes?.length ? this.wrap(codes[0].code) : undefined
  }

  get(code: string) {
    return this.codes.get(this.unwrap(code))
  }
}

export const github = new EmojiPack()
for (const [code, emoji] of emojis.emojis) {
  github.add({ code, emoji })
}

export const gitmoji = new EmojiPack()
for (const gm of gitmojis.gitmojis) {
  gitmoji.add(gm)
}
