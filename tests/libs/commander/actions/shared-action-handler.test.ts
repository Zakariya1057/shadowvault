import { setProviderAction } from '@libs/commander/provider/set-provider-action'
import { ensureProjectName } from '@libs/commander/validate/ensure-project-names'
import { handleSpecificFiles } from '@libs/commander/actions/handle-specific-files'
import { CommandOptions } from '@entities/command-options'
import { sharedActionHandler } from '@libs/commander/actions/shared-action-handler'
import { Provider } from '@entities/provider'

jest.mock('@libs/commander/provider/set-provider-action')
jest.mock('@libs/commander/validate/ensure-project-names')
jest.mock('@libs/commander/actions/handle-specific-files')

describe('sharedActionHandler', () => {
  const mockAllAction = jest.fn()
  const mockSingleFileAction = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set provider action', () => {
    const mockFiles = []
    const mockOptions: CommandOptions = {
      stage: 'production',
      provider: Provider.S3,
      all: false,
    }

    sharedActionHandler(
      mockFiles,
      mockOptions,
      mockAllAction,
      mockSingleFileAction,
    )

    expect(setProviderAction).toHaveBeenCalledWith(mockOptions.provider)
  })

  it('should ensure project name', () => {
    const mockFiles = []
    const mockOptions: CommandOptions = {
      stage: 'production',
      provider: Provider.S3,
      all: false,
    }

    sharedActionHandler(
      mockFiles,
      mockOptions,
      mockAllAction,
      mockSingleFileAction,
    )

    expect(ensureProjectName).toHaveBeenCalledWith(mockOptions)
  })

  it('should call all action when "all" option is true', () => {
    const mockFiles = []
    const mockOptions: CommandOptions = {
      stage: 'production',
      provider: Provider.S3,
      all: true,
    }

    sharedActionHandler(
      mockFiles,
      mockOptions,
      mockAllAction,
      mockSingleFileAction,
    )

    expect(mockAllAction).toHaveBeenCalledWith(mockOptions)
    expect(handleSpecificFiles).not.toHaveBeenCalled()
  })

  it('should handle specific files when "all" option is false', () => {
    const mockFiles = ['file1.env', 'file2.env']
    const mockOptions: CommandOptions = {
      stage: 'production',
      provider: Provider.S3,
      all: false,
    }

    sharedActionHandler(
      mockFiles,
      mockOptions,
      mockAllAction,
      mockSingleFileAction,
    )

    expect(handleSpecificFiles).toHaveBeenCalledWith(
      mockFiles,
      mockSingleFileAction,
      mockOptions,
    )
    expect(mockAllAction).not.toHaveBeenCalled()
  })
})
