import { constructFolderName } from '@utils/file/construct-folder-name'
import { ioc } from '@utils/ioc'
import { TYPES } from '@providers/types'
import { download } from '@libs/env/download'
import { extractFilename } from '@utils/file/extract-filename'
import { CloudStorageClient } from '@entities/cloud-storage-client'
import { CommandOptions } from '@entities/command-options'

export const downloadAll = async (options: CommandOptions): Promise<void> => {
  const folderPrefix = constructFolderName(options)

  const client = await ioc.get<CloudStorageClient>(TYPES.Clients.Storage)

  const files = await client.listFilesInFolder(folderPrefix)

  files.forEach((envFile) => {
    const path = extractFilename(envFile)
    download(path, options)
  })
}
