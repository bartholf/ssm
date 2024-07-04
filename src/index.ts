#!/usr/bin/env node

import { FileParser } from './util/file-parser';
import { ArgumentParser } from './argument-parser';
import * as AWS from '@aws-sdk/client-ssm';
import Ajv, { JSONSchemaType } from 'ajv';

interface IPutParameterArg {
  Name: string;
  Value: string;
  Overwrite?: boolean;
  Type?: 'String' | 'SecureString' | undefined;
}

const schema: JSONSchemaType<IPutParameterArg> = {
  type: 'object',
  properties: {
    Name: { type: 'string' },
    Value: { type: 'string' },
    Overwrite: { type: 'boolean', nullable: true },
    Type: { type: 'string', nullable: true },
  },
  required: ['Name', 'Value'],
  additionalProperties: false,
};

const validate = new Ajv().compile<IPutParameterArg>(schema);

const args = ArgumentParser.parse();
const json = FileParser.parseJson<[IPutParameterArg]>(args.file);
const client = new AWS.SSMClient({});

const putParameter = async (fnArgs: IPutParameterArg) => {
  fnArgs.Name = `/${args.env}/${fnArgs.Name}`;
  fnArgs.Type = fnArgs.Type || 'String';
  fnArgs.Overwrite = fnArgs.Overwrite === undefined ? true : fnArgs.Overwrite;

  if (!validate(fnArgs)) {
    console.error(validate.errors);
    process.exit(1);
  }

  if (args.verbose) {
    const displayArg = fnArgs;
    fnArgs.Type === 'SecureString' && (displayArg.Value = '*****');
    console.info([
      (args.dry ? '[Dry run] ' : '') + 'Add parameter:',
      displayArg,
    ]);
  }

  if (args.dry) {
    return;
  }

  await client.send(new AWS.PutParameterCommand(fnArgs));
};

json.forEach(putParameter);
