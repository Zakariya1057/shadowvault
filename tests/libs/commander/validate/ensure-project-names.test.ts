import { getLocalProjectName } from '@libs/files/get-local-project-name'
import { CommandOptions } from '@entities/command-options'
import { ensureProjectName } from '@libs/commander/validate/ensure-project-names'
import { Provider } from '@entities/provider'

jest.mock('@libs/files/get-local-project-name')

describe('ensureProjectName', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  let options: CommandOptions

  beforeEach(() => {
    options = {
      stage: 'production',
      provider: Provider.S3,
    }
  })

  it('should not modify options if name is already set', () => {
    ensureProjectName({
      ...options,
      ...{
        name: 'name-set',
      },
    })

    expect(options.name).toBeUndefined()
  })

  it('should set the project name from getLocalProjectName if name is not set in options', () => {
    ;(getLocalProjectName as jest.Mock).mockReturnValue('localProjectName')

    ensureProjectName(options)

    expect(options.name).toBe('localProjectName')
  })

  it('should throw an error if name is not set in options and getLocalProjectName returns null', () => {
    ;(getLocalProjectName as jest.Mock).mockReturnValue(null)

    expect(() => ensureProjectName(options)).toThrow(
      'Either specify a project name or run this in a directory which has a package.json file.',
    )
  })
})
