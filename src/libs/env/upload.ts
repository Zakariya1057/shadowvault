import { BaseOptions } from '@src/entities/base-options'
import { validateFilename } from '@src/utils/validators/validate-filename'
import { ioc } from '@src/utils/ioc'
import { S3Client } from '@libs/s3/s3-client'
import { TYPES } from '@src/providers/types'
import { validateFileExists } from '@src/utils/validators/validate-file-exists'
import { getFileContents } from '@src/utils/file/get-file-contents'
import { constructFilename } from '@src/utils/file/construct-filename'

export const upload = async (
  filename: string,
  options: BaseOptions,
): Promise<void> => {
  validateFilename(filename)
  validateFileExists(filename)

  const location = constructFilename(filename, options)

  console.log(`Initiating upload of ${filename} to ${location} on AWS S3...`)

  const body = await getFileContents(filename)

  await ioc.get<S3Client>(TYPES.Clients.S3).upload(location, body)
}
