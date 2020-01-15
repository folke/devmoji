import { ConfigOptions } from "./config-options"

export const defaults: ConfigOptions = {
  types: [
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "chore",
    "build",
    "ci",
  ],
  devmoji: [
    { code: "feat", description: "a new feature", emoji: "sparkles" },
    { code: "fix", description: "a bug fix", emoji: "bug" },
    { code: "docs", description: "documentation only changes", emoji: "books" },
    {
      code: "style",
      description:
        "changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
      emoji: "art",
    },
    {
      code: "refactor",
      description: "a code change that neither fixes a bug nor adds a feature",
      emoji: "hammer",
    },
    {
      code: "perf",
      description: "a code change that improves performance",
      emoji: "zap",
    },
    {
      code: "test",
      description: "adding missing or correcting existing tests",
      emoji: "rotating_light",
    },
    {
      code: "chore",
      description:
        "changes to the build process or auxiliary tools and libraries such as documentation generation",
      emoji: "wrench",
    },
    {
      code: "chore-release",
      description: "code deployment or publishing to external repositories",
      emoji: "rocket",
    },
    {
      code: "chore-deps",
      description: "add or delete dependencies",
      emoji: "link",
    },
    {
      code: "build",
      description: "changes related to build processes",
      emoji: "package",
    },
    {
      code: "ci",
      description: "updates to the continuous integration system",
      emoji: "construction_worker",
    },
    {
      code: "release",
      description: "code deployment or publishing to external repositories",
      emoji: "rocket",
    },

    {
      code: "security",
      gitmoji: "lock",
    },
    {
      code: "i18n",
      gitmoji: "globe_with_meridians",
    },
    {
      code: "breaking",
      gitmoji: "boom",
    },
  ],
}
