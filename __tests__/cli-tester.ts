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

test("async1", () => {
  const mockCli = new MockCli()
  mockCli.testAsync(async () => {
    await new Promise((done) => {
      process.stdout.write("test")
      done()
    })
  })
  expect(mockCli.stdout?.data).toMatch(/test/)
})

test("async2", () => {
  const mockCli = new MockCli()
  mockCli.testAsync(async () => {
    console.log("foo")
    await new Promise((done) => {
      console.log("test")
      done()
    })
  })
  expect(mockCli.stdout?.data).toMatch(/foo/)
})
