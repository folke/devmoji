import { ConventionalCommits } from "../src/conventional-commits"
import { Config } from "../src/config"
import { Devmoji } from "../src/devmoji"

test("no scope commit msg", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.format("feat: testing")).toBe("feat: ✨ testing")
})

test("invalid type commit msg", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.format("foo: testing")).toBe("foo: testing")
})

test("type with scope commit msg", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.format("feat(cli): testing")).toBe("feat(cli): ✨ testing")
})

test("invalid commit msg ", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.format("invalid commit")).toBe("invalid commit")
})

test("type with existing devmoji", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.format("feat(cli): :test: testing")).toBe(
    "feat(cli): ✨ 🚨 testing"
  )
})
