import { ConventionalCommits } from "../src/conventional-commits"
import { Config } from "../src/config"
import { Devmoji } from "../src/devmoji"

test("no scope commit msg", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.formatCommit("feat: testing")).toBe("feat: ✨ testing")
})

test("invalid type commit msg", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.formatCommit("foo: testing")).toBe("foo: testing")
})

test("type with scope commit msg", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.formatCommit("feat(cli): testing")).toBe("feat(cli): ✨ testing")
})

test("type with scope release commit msg", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.formatCommit("chore(release): testing")).toBe(
    "chore(release): 🚀 testing"
  )
})

test("invalid commit msg ", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.formatCommit("invalid commit")).toBe("invalid commit")
})

test("type with existing devmoji", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))
  expect(cc.formatCommit("feat(cli): :test: testing")).toBe(
    "feat(cli): ✨ 🚨 testing"
  )
})

test("log", () => {
  const cc = new ConventionalCommits(new Devmoji(new Config()))

  expect(
    cc.formatLog(
      `bla feat(cli): testing
bla bla feat: :test: testing
feat(cli): :sparkles: foo
chore(release): deploy
eat(cli): :test: testing`
    )
  ).toBe(`bla feat(cli): ✨ testing
bla bla feat: ✨ 🚨 testing
feat(cli): ✨ foo
chore(release): 🚀 deploy
eat(cli): 🚨 testing`)
})
