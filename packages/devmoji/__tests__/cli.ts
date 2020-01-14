import { Cli } from "../src/cli"
import { CommanderError } from "commander"

test("--help", async () => {
  const spyOut = jest.spyOn(global.process.stdout, "write").mockImplementation()

  await expect(Cli.create(["", "", "-h"], true)).rejects.toThrow(CommanderError)
  expect(spyOut.mock.calls[0][0]).toMatch(/Usage:/)

  spyOut.mockRestore()
})
