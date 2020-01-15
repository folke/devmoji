module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: [["CHANGELOG.md", "package.json", "../../CHANGELOG.md"]],
      },
    ],
  ],
}
