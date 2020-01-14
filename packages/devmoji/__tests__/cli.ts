import { Cli } from "../src/cli"
import { CommanderError } from "commander"
import { MockCli } from "../src/cli-tester"

test("--help", async () => {
  const mockCli = new MockCli()
  await expect(
    mockCli.testAsync(() => Cli.create(["", "", "-h"], true))
  ).rejects.toThrow(CommanderError)
  expect(mockCli.stdout?.data).toMatch(/Usage:/)
})

// test("no options", async () => {
//   const mockCli = new MockCli()
//   // jest.spyOn(process, "exit").mockImplementation(() => {
//   //   throw "exit"
//   // })

//   await mockCli.testAsync(async () => {
//     const cli = await Cli.create(["", ""], true)
//     cli.run()
//   })
//   // expect(mockCli.exitCode).toBe(1)
//   console.log(mockCli.stdout?.data)
//   expect(mockCli.stdout?.data).toMatch(/Usage:/)
// })

test("--list", async () => {
  const mockCli = new MockCli()
  // mockCli.setup()
  await mockCli.testAsync(async () => {
    const cli = await Cli.create(["", "", "--list"], true)
    cli.run()
  })
  expect(mockCli.stdout?.data).toMatch(/all configured/)
})

test("--text", async () => {
  const mockCli = new MockCli()
  await mockCli.testAsync(async () => {
    const cli = await Cli.create(["", "", "--text", ":smile:"], true)
    cli.run()
  })
  expect(mockCli.stdout?.data).toMatch(/😄/)
})
