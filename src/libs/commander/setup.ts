import { uploadCommand } from '@libs/commander/actions/upload-command'
import { downloadCommand } from '@libs/commander/actions/download-command'
import { Command } from 'commander'

export const setup = async (): Promise<Command> => {
  const program = new Command()

  program
    .name('shadowvault')
    .version('1.0.0')
    .description(
      'ShadowVault - A CLI tool to manage environment files on cloud storage.',
    )
    .addCommand(uploadCommand)
    .addCommand(downloadCommand)

  return program
}
