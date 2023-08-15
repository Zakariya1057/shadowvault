import { ioc } from '@utils/ioc'
import { TYPES } from '@providers/types'
import { validateFileExists } from '@utils/validators/validate-file-exists'
import { getFileContents } from '@utils/file/get-file-contents'
import { constructFilename } from '@utils/file/construct-filename'
import { CloudStorageClient } from '@entities/cloud-storage-client'
import { CommandOptions } from '@entities/command-options'
import { strict } from 'assert'

export const upload = async (
  filename: string,
  options: CommandOptions,
): Promise<void> => {
  strict(filename, 'A filename is mandatory for the operation.')

  validateFileExists(filename)

  const location = constructFilename(filename, options)

  console.log(
    `Initiating upload of ${filename} to ${location} on cloud storage...`,
  )

  const body = await getFileContents(filename)

  await ioc
    .get<CloudStorageClient>(TYPES.Clients.Storage)
    .upload(location, body)
}
