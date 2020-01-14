import { Config } from "../src/config"

test("load config", async () => {
  const config = await Config.load("__tests__/ignore.devmoji.config.js")
  expect(config.pack.get("feat")?.emoji).toBe("poop")
  expect(config.pack.get("fuckup")?.emoji).toBe("poop")
})

test("missing prop code", () => {
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: ConfigOptions = { devmoji: [{ foo: 1 }] } as any
    new Config(config)
  }).toThrow(/code is missing/)
})

test("missing prop emoji", () => {
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: ConfigOptions = {
      devmoji: [{ code: "foo" }],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
    new Config(config)
  }).toThrow(/Missing.*emoji.*/)
})

test("missing config file", async () => {
  try {
    await Config.load("missing-config-file")
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    expect(error).toMatch(/missing.*/)
  }
})

test("config without devmoji", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: ConfigOptions = { types: [] } as any
  expect(() => {
    new Config(config)
  }).not.toThrow()
})

test("invalid gitmoji", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: ConfigOptions = {
    devmoji: [{ code: "test", gitmoji: "foobar" }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
  expect(() => {
    new Config(config)
  }).toThrow(/Gitmoji .* not found/)
})

test("default config file", async () => {
  try {
    await Config.load()
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    expect(error).toMatch(/missing.*/)
  }
})

test("no default config file", async () => {
  try {
    await Config.load(undefined, "/")
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    expect(error).toMatch(/missing.*/)
  }
})
