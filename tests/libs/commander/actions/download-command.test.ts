import { downloadCommand } from '@libs/commander/actions/download-command'

describe('downloadCommand', () => {
  it('should be properly initialized', () => {
    expect(downloadCommand.name()).toBe('download')
    expect(downloadCommand.description()).toBe(
      'Retrieve environment files from cloud storage to your local machine.',
    )
  })
})
