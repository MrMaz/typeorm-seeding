import { Arguments, Argv, CommandModule, exit } from 'yargs'
import { configureDataSource, getSeederOptions } from '../data-source'

import { red } from 'chalk'

interface ConfigCommandArguments extends Arguments {
  root?: string
  seederConfig?: string
}

export class ConfigCommand implements CommandModule {
  command = 'config'
  describe = 'Show the TypeORM config with seeding values'

  /**
   * @inheritdoc
   */
  builder(args: Argv) {
    return args
      .option('r', {
        alias: 'root',
        type: 'string',
        describe: 'Path to project root',
        default: process.cwd(),
      })
      .option('c', {
        alias: 'seederConfig',
        type: 'string',
        describe: 'Path to the seeder config file',
      })
  }

  /**
   * @inheritdoc
   */
  async handler(args: ConfigCommandArguments) {
    const rootPath = args.root && args.root[0] === '.' ? process.cwd() + '/' + args.root : args.root

    try {
      configureDataSource({
        root: rootPath,
        seederConfig: args.seederConfig,
      })
      const options = await getSeederOptions()
      console.log(options)
    } catch (error: unknown) {
      console.log('\n❌ ', red('Could not find the seeder config file'))
      console.error(error)
      exit(1, error as Error)
    }
  }
}
