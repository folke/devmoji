import { Cli } from "../src/cli"

test("should", async () => {
  const cli = await Cli.create(["", ""], true)
  const valid = `style: 🎨 prettier 2.0
  fixup! foo
  squash!
  revert something
  Merge branch 'master' of github.com:folke/devmoji
  style: 🎨 Prettier 2.0
  chore(release): 2.1.8 [skip ci]
  fix(deps): update dependency chalk to v4 (#49)
  chore(deps): update all non-major dependencies (#48)
  chore(release): 2.1.7 [skip ci]
  fix: 🐛 🔒️ upgrade minimist which had a security vulnerability
  chore(deps): update all non-major dependencies (#47)
  chore(deps): update dependency prettier to v2 (#46)
  chore(deps): update all non-major dependencies (#45)
  chore(deps): update dependency rollup to v2.1.0 (#44)
  chore(deps): update all non-major dependencies to v2.24.0 (#43)
  chore(release): 2.1.6 [skip ci]
  fix: 🐛 new rollup version and commanderjs
  chore(deps): update all non-major dependencies (#37)
  chore(deps): update all non-major dependencies (#34)
  chore(release): 2.1.5 [skip ci]
  docs: fixed config example
  feat(TextInput): add new variant
  chore(deps): update dependency rollup to v2 (#35)
  feat(JIRA-123): add new variant
  feat(jira-123): add new variant
    .split("\n")
    .map((s) => s.trim())
  for (const msg of valid) {
    expect(cli.lint(msg)).toHaveLength(0)
  }

  const invalid = `Style: 🎨 prettier 2.0
  Merging branch 'master' of github.com:folke/devmoji
  style 🎨 Prettier 2.0
  chorerelease): 2.1.8 [skip ci]
  fix(deps) update dependency chalk to v4 (#49)
  chore(depS: update all non-major dependencies (#48)
  2.1.7 [skip ci]
   🔒️ upgrade minimist which had a security vulnerability
  update all non-major dependencies (#47)`
    .split("\n")
    .map((s) => s.trim())
  for (const msg of invalid) {
    expect(cli.lint(msg)).not.toHaveLength(0)
  }
})
