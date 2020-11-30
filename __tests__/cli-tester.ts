import { MockCli } from "../src/cli-tester"

test("sync", () => {
  const mockCli = new MockCli()
  mockCli.test(() => {
    console.log("test")
  })
  expect(mockCli.stdout?.data).toMatch(/test/)
})

test("stderr", () => {
  const mockCli = new MockCli()
  mockCli.test(() => {
    console.error("test")
  })
  expect(mockCli.stderr?.data).toMatch(/test/)
})

test("sync2", () => {
  const mockCli = new MockCli()
  mockCli.test(() => {
    console.log("test")
  })
  expect(mockCli.stdout?.data).toMatch(/test/)
})

test("async1", async () => {
  const mockCli = new MockCli()
  await mockCli.testAsync(async () => {
    await new Promise<void>((done) => {
      process.stdout.write("test")
      done()
    })
  })
  expect(mockCli.stdout?.data).toMatch(/test/)
})

test("async2", async () => {
  const mockCli = new MockCli()
  await mockCli.testAsync(async () => {
    console.log("foo")
    await new Promise<void>((done) => {
      console.log("test")
      done()
    })
  })
  expect(mockCli.stdout?.data).toMatch(/foo/)
})
