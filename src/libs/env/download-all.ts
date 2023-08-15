import { BaseOptions } from '@src/entities/base-options'
import { constructFolderName } from '@src/utils/file/construct-folder-name'
import { ioc } from '@src/utils/ioc'
import { S3Client } from '@libs/s3/s3-client'
import { TYPES } from '@src/providers/types'
import { download } from '@libs/env/download'
import { extractFilename } from '@src/utils/file/extract-filename'

export const downloadAll = async (options: BaseOptions): Promise<void> => {
  const folderPrefix = constructFolderName(options)

  const client = await ioc.get<S3Client>(TYPES.Clients.S3)

  const files = await client.listFilesInFolder(folderPrefix)

  files.forEach((envFile) => {
    const path = extractFilename(envFile)
    download(path, options)
  })
}
