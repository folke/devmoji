import { Config } from "../src/config"
import { TDevmoji } from "../src/codes"

test("load config", async () => {
  const config = await Config.load("__tests__/ignore.devmoji.config.js")
  expect(config.codes.get("feat")?.emoji).toBe("poop")
  expect(config.codes.get("fuckup")?.emoji).toBe("poop")
})

test("missing prop code", () => {
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: { codes: TDevmoji[] } = { codes: [{ foo: 1 }] } as any
    new Config(config)
  }).toThrow(/Missing.*code.*/)
})

test("missing prop emoji", () => {
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: { codes: TDevmoji[] } = { codes: [{ code: "foo" }] } as any
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
