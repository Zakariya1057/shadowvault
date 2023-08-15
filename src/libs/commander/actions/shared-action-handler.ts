import { setProviderAction } from '@libs/commander/provider/set-provider-action'
import { CommandOptions } from '@entities/command-options'
import { ensureProjectName } from '@libs/commander/validate/ensure-project-names'
import { handleSpecificFiles } from '@libs/commander/actions/handle-specific-files'

export type AllActionType = (options: CommandOptions) => void
export type SingleFileActionType = (
  file: string,
  options: CommandOptions,
) => void

export const sharedActionHandler = (
  files: string[],
  options: CommandOptions,
  allAction: AllActionType,
  singleFileAction: SingleFileActionType,
): void => {
  setProviderAction(options.provider)
  ensureProjectName(options)

  if (options.all) {
    allAction(options)
  } else {
    handleSpecificFiles(files, singleFileAction, options)
  }
}
