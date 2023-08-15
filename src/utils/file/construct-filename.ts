import { BaseOptions } from '@src/entities/base-options'
import { constructFolderName } from '@src/utils/file/construct-folder-name'

export const constructFilename = (
  filename: string,
  options: BaseOptions,
): string => {
  return `${constructFolderName(options)}/${filename}`
}
