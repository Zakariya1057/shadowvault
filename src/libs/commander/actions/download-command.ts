import { setCommonOptions } from '@libs/commander/options/set-common-options'
import { Command } from 'commander'
import { sharedActionHandler } from '@libs/commander/actions/shared-action-handler'
import { downloadAll } from '@libs/env/download-all'
import { download } from '@libs/env/download'

export const downloadCommand = new Command('download')
  .description(
    'Retrieve environment files from cloud storage to your local machine.',
  )
  .action(async (files, options) =>
    sharedActionHandler(files, options, downloadAll, download),
  )

setCommonOptions(downloadCommand)
