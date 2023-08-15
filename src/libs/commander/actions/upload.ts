import { Command } from 'commander'
import { upload } from '@libs/env/upload'
import { uploadAll } from '@libs/env/upload-all'

export const uploadCommand = new Command('upload')
  .description('Safely push environment files to AWS S3.')
  .option('-A, --all', 'Upload all .env files in the current directory')
  .argument('[files...]', 'List of env files to upload')
  .requiredOption(
    '-n, --name <projectName>',
    'Specify the project associated with the files.',
  )
  .option(
    '-e, --stage <stage>',
    'Specify the target stage (e.g., dev, prod, staging). Defaults to "default".',
    'default',
  )
  .action(async (files, options) => {
    if (options.all) {
      await uploadAll(options)
    } else if (files && files.length) {
      files.forEach((file) => upload(file, options))
    } else {
      console.error('Please specify files to upload or use the --all flag.')
    }
  })
