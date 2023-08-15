import { CommandOptions } from '@entities/command-options'
import { getLocalProjectName } from '@libs/files/get-local-project-name'

export const ensureProjectName = (options: CommandOptions): void => {
  if (!options.name) {
    const name = getLocalProjectName()

    if (!name) {
      throw new Error(
        'Either specify a project name or run this in a directory which has a package.json file.',
      )
    }

    options.name = name
  }
}
