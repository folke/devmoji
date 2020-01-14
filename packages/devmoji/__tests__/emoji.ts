import * as gitmojis from "../src/data/gitmoji.emoji.json"
import { emoji } from "../src/emoji"

test("all gitmoji should be valid", () => {
  for (const { emoji: unicode, code: shortcode } of gitmojis.gitmojis) {
    const name = emoji.unwrap(shortcode)
    expect(emoji.wrap(shortcode)).toBe(shortcode)
    expect(emoji.unwrap(name)).toBe(name)
    expect(emoji.wrap(emoji.unwrap(shortcode))).toBe(shortcode)
    expect(emoji.get(shortcode)).toBeDefined()
    expect(emoji.getCode(unicode)).toBe(shortcode)
  }
})

test("unknown codes", () => {
  expect(emoji.get("missing")).toBe(":missing:")
  expect(emoji.get(":missing:")).toBe(":missing:")
})
