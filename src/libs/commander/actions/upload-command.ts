import { setCommonOptions } from '@libs/commander/options/set-common-options'
import { Command } from 'commander'
import { sharedActionHandler } from '@libs/commander/actions/shared-action-handler'
import { uploadAll } from '@libs/env/upload-all'
import { upload } from '@libs/env/upload'

export const uploadCommand = new Command('upload')
  .description('Safely upload environment files to cloud storage.')
  .action(async (files: string[], options) =>
    sharedActionHandler(files, options, uploadAll, upload),
  )

setCommonOptions(uploadCommand)
