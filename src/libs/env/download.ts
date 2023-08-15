import { ioc } from '@utils/ioc'
import { TYPES } from '@providers/types'
import { constructFilename } from '@utils/file/construct-filename'
import { extractFilename } from '@utils/file/extract-filename'
import { CloudStorageClient } from '@entities/cloud-storage-client'
import { CommandOptions } from '@entities/command-options'
import { strict } from 'assert'

export const download = async (
  filename: string,
  options: CommandOptions,
): Promise<void> => {
  strict(filename, 'A filename is mandatory for the operation.')

  const location = constructFilename(filename, options)

  console.log(
    `Initiating download of ${filename} from ${location} on cloud storage...`,
  )

  const destination = extractFilename(filename)

  await ioc
    .get<CloudStorageClient>(TYPES.Clients.Storage)
    .download(location, destination)
}
