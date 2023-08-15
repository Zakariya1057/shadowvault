import { BaseOptions } from '@src/entities/base-options'

export const constructFolderName = (options: BaseOptions): string => {
  return `${options.name}/${options.stage}`
}
