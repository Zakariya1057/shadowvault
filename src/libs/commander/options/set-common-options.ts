import { Command } from 'commander'
import { Provider } from '@entities/provider'

export const setCommonOptions = (command: Command): Command => {
  return command
    .option('-A, --all', 'Upload/Download all .env files')
    .argument('[files...]', 'List of env files to upload/download')
    .option(
      '-n, --name <projectName>',
      'Specify the project associated with the files.',
    )
    .option(
      '-s, --stage <stage>',
      'Specify the stage (e.g., dev, prod, staging). Defaults to "default".',
      'default',
    )
    .option(
      '-p, --provider <type>',
      'Specify the storage provider. Supported: s3, gcs.',
      Provider.S3,
    )
}
