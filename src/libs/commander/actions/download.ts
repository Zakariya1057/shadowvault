import { Command } from 'commander'
import { download } from '@libs/env/download'
import { downloadAll } from '@libs/env/download-all'

export const downloadCommand = new Command('download')
  .description('Retrieve environment files from AWS S3 to your local machine.')
  .option('-A, --all', 'Download all .env files from the cloud')
  .argument('[files...]', 'List of env files to download')
  .requiredOption(
    '-n, --name <projectName>',
    'Specify the project associated with the files.',
  )
  .option(
    '-e, --stage <stage>',
    'Specify the source stage (e.g., dev, prod, staging). Defaults to "default".',
    'default',
  )
  .action(async (files, options) => {
    if (options.all) {
      await downloadAll(options)
    } else if (files && files.length) {
      files.forEach((file) => download(file, options))
    } else {
      console.error('Please specify files to download or use the --all flag.')
    }
  })
