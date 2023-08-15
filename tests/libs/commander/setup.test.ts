import { Command } from 'commander'
import { uploadCommand } from '@libs/commander/actions/upload-command'
import { downloadCommand } from '@libs/commander/actions/download-command'
import { setup } from '@libs/commander/setup'

describe('setupTest', () => {
  let program: Command

  beforeEach(async () => {
    program = await setup()
  })

  it('should set the correct program name', () => {
    expect(program.name()).toBe('shadowvault')
  })

  it('should set the correct description', () => {
    expect(program.description()).toBe(
      'ShadowVault - A CLI tool to manage environment files on cloud storage.',
    )
  })

  it('should add uploadCommand to the program', () => {
    const foundUploadCommand = program.commands.find(
      (cmd) => cmd === uploadCommand,
    )
    expect(foundUploadCommand).toBeDefined()
  })

  it('should add downloadCommand to the program', () => {
    const foundDownloadCommand = program.commands.find(
      (cmd) => cmd === downloadCommand,
    )
    expect(foundDownloadCommand).toBeDefined()
  })
})
