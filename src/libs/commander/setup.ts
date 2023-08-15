import { uploadCommand } from '@libs/commander/actions/upload'
import { downloadCommand } from '@libs/commander/actions/download'
import { Command } from 'commander'

export const setup = async (): Promise<Command> => {
  const program = new Command()

  program
    .name('shadowvault')
    .version('0.0.1')
    .description(
      'ShadowVault - A CLI tool to manage environment files on AWS S3.',
    )
    .addCommand(uploadCommand)
    .addCommand(downloadCommand)

  return program
}
