import { BaseOptions } from '@src/entities/base-options'
import { validateFilename } from '@src/utils/validators/validate-filename'
import { ioc } from '@src/utils/ioc'
import { S3Client } from '@libs/s3/s3-client'
import { TYPES } from '@src/providers/types'
import { constructFilename } from '@src/utils/file/construct-filename'
import { extractFilename } from '@src/utils/file/extract-filename'

export const download = async (
  filename: string,
  options: BaseOptions,
): Promise<void> => {
  validateFilename(filename)

  const location = constructFilename(filename, options)

  console.log(
    `Initiating download of ${filename} from ${location} on AWS S3...`,
  )

  const destination = extractFilename(filename)

  await ioc.get<S3Client>(TYPES.Clients.S3).download(location, destination)
}
