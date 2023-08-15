import { constructFolderName } from '@utils/file/construct-folder-name'
import { CommandOptions } from '@entities/command-options'

export const constructFilename = (
  filename: string,
  options: CommandOptions,
): string => {
  return `${constructFolderName(options)}/${filename}`
}
