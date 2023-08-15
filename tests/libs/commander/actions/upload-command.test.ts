import { uploadCommand } from '@libs/commander/actions/upload-command'

jest.mock('@libs/commander/actions/shared-action-handler')

describe('uploadCommand', () => {
  beforeAll(() => {})

  it('should have the command name "upload"', () => {
    expect(uploadCommand.name()).toBe('upload')
  })

  it('should have the correct description', () => {
    expect(uploadCommand.description()).toBe(
      'Safely upload environment files to cloud storage.',
    )
  })

  it('should have common options set', () => {
    const allOptionDefined = uploadCommand.options.some(
      (option) => option.flags === '-A, --all',
    )
    expect(allOptionDefined).toBe(true)
  })
})
