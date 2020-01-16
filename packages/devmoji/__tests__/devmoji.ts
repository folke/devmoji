import { Config } from "../src/config"
import { Devmoji } from "../src/devmoji"

test("emojify", () => {
  const devmoji = new Devmoji(new Config())

  const tests: [string, string][] = [
    [":rocket:", "🚀"],
    [":missing:", ":missing:"],
    ["testing 123", "testing 123"],
  ]

  for (const t of tests) {
    expect(devmoji.emojify(t[0])).toBe(t[1])
  }
})

test("strip", () => {
  const devmoji = new Devmoji(new Config())

  const tests: [string, string][] = [
    ["build: 📦 added", "build:  added"],
    [":missing:", ""],
    ["testing 123 :feat:", "testing 123 "],
  ]

  for (const t of tests) {
    expect(devmoji.strip(t[0])).toBe(t[1])
  }
})

test("demojify", () => {
  const devmoji = new Devmoji(new Config())

  const tests: [string, string][] = [
    ["🚀", ":rocket:"],
    [":missing:", ":missing:"],
    ["testing 123", "testing 123"],
  ]

  for (const t of tests) {
    expect(devmoji.demojify(t[0])).toBe(t[1])
  }
})

test("devmojify", () => {
  const devmoji = new Devmoji(new Config())

  const tests: [string, string][] = [
    [":rocket:", ":chore-release:"],
    [":sparkles:", ":feat:"],
    ["🚀", ":chore-release:"],
    ["testing 123", "testing 123"],
  ]

  for (const t of tests) {
    expect(devmoji.devmojify(t[0])).toBe(t[1])
  }
})
