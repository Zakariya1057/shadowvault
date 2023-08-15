import { getAllEnvFiles } from '@libs/files/get-all-env-files'
import { upload } from '@libs/env/upload'
import { extractFilename } from '@utils/file/extract-filename'
import { CommandOptions } from '@entities/command-options'

export const uploadAll = async (options: CommandOptions): Promise<void> => {
  const envFiles = getAllEnvFiles()
  envFiles.forEach((envFile) => {
    const path = extractFilename(envFile)
    upload(path, options)
  })
}
