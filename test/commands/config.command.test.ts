import { ConfigCommand } from '../../src/commands/config.command'
import yargs from 'yargs'

describe(ConfigCommand, () => {
  let command: ConfigCommand

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => void 0)
    jest.spyOn(console, 'error').mockImplementation(() => void 0)
  })

  beforeEach(() => {
    command = new ConfigCommand()
  })

  describe(ConfigCommand.prototype.handler, () => {
    test('Should use the config file argument', async () => {
      expect(yargs.command(command).parse('config -c test/seeding.ts')).resolves.toBeTruthy()
    })

    test('Should use the config directory argument', async () => {
      expect(yargs.command(command).parse('config -r . -c test/seeding.ts')).resolves.toBeTruthy()
    })

    test('Should throw error', async () => {
      const exitFn = jest.fn()
      jest.spyOn(process, 'exit').mockImplementation(exitFn as any)

      await yargs.command(command).parse('config -c NOPE')

      expect(exitFn).toHaveBeenNthCalledWith(1, 1)
    })
  })
})
