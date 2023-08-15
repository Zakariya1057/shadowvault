import { getAllEnvFiles } from '@libs/files/get-all-env-files'
import { upload } from '@libs/env/upload'
import { BaseOptions } from '@src/entities/base-options'
import { extractFilename } from '@src/utils/file/extract-filename'

export const uploadAll = async (options: BaseOptions): Promise<void> => {
  const envFiles = getAllEnvFiles()
  envFiles.forEach((envFile) => {
    const path = extractFilename(envFile)
    upload(path, options)
  })
}
