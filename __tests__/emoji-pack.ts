import gitmojis from "../src/data/gitmoji.emoji"
import { github, gitmoji } from "../src/emoji-pack"

test("all gitmoji should be valid", () => {
  for (const { code } of gitmojis.gitmojis) {
    const shortcode = github.wrap(code)
    const name = github.unwrap(shortcode)
    expect(github.wrap(shortcode)).toBe(shortcode)
    expect(github.unwrap(name)).toBe(name)
    expect(github.wrap(github.unwrap(shortcode))).toBe(shortcode)
    expect(github.get(shortcode)?.emoji).toBeDefined()
    const em = github.get(shortcode)
    expect(em).toBeDefined()
    if (em) {
      expect(em.emoji).toBeDefined()
      expect(github.getCode(em.emoji)).toBeDefined()
    }
  }
})

test("unknown codes", () => {
  expect(github.get("missing")).toBeUndefined()
  expect(github.get(":missing:")).toBeUndefined()
})

test("should pass", () => {
  expect(gitmoji.get("art")).toBeDefined()
})
