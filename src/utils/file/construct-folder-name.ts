import { CommandOptions } from '@entities/command-options'

export const constructFolderName = (options: CommandOptions): string => {
  return `${options.name}/${options.stage}`
}
