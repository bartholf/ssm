import yargs from 'yargs';

interface IArguments {
  dry?: boolean;
  env?: string;
  file: string;
  verbose?: boolean;
}

export class ArgumentParser {
  #args: IArguments;

  private constructor() {
    this.#args = yargs
      .usage('Usage: $0 -f <file> [-e <env>]')
      .scriptName('ssmmanager')
      .options({
        dry: {
          type: 'boolean',
          demandOption: false,
          alias: 'd',
          default: false,
          describe: 'Dry run mode. No changes will be made.',
        },
        env: {
          type: 'string',
          demandOption: true,
          alias: 'e',
          default: process.env.ENVIRONMENT_NAME,
          describe: 'The environment name to use',
        },
        file: {
          type: 'string',
          demandOption: true,
          alias: 'f',
          describe: 'The file to parse',
        },
        verbose: {
          type: 'boolean',
          default: false,
          alias: 'v',
          describe: 'Enable detailed output of command execution',
        },
      }).argv as IArguments;
  }

  static parse = (): IArguments => new ArgumentParser().#args;
}
