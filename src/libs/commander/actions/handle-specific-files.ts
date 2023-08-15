import { CommandOptions } from '@entities/command-options'
import { SingleFileActionType } from '@libs/commander/actions/shared-action-handler'

export const handleSpecificFiles = (
  files: string[],
  action: SingleFileActionType,
  options: CommandOptions,
): void => {
  if (files && files.length) {
    files.forEach((file) => action(file, options))
  } else {
    throw new Error('Please specify files or use the --all flag.')
  }
}
