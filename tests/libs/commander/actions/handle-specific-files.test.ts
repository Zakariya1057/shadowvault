import { CommandOptions } from '@entities/command-options'
import { handleSpecificFiles } from '@libs/commander/actions/handle-specific-files'
import { Provider } from '@entities/provider'

describe('handleSpecificFiles', () => {
  let mockAction: jest.Mock
  let mockOptions: CommandOptions

  beforeEach(() => {
    mockAction = jest.fn()
    mockOptions = {
      stage: 'production',
      provider: Provider.S3,
      all: false,
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call action for each file when files are provided', () => {
    const mockFiles = ['file1.env', 'file2.env']

    handleSpecificFiles(mockFiles, mockAction, mockOptions)

    expect(mockAction).toHaveBeenCalledTimes(mockFiles.length)

    mockFiles.forEach((file) => {
      expect(mockAction).toHaveBeenCalledWith(file, mockOptions)
    })
  })

  it('should throw error and not call action if no files are provided', () => {
    expect(() => handleSpecificFiles([], mockAction, mockOptions)).toThrow(
      'Please specify files or use the --all flag.',
    )

    expect(mockAction).not.toHaveBeenCalled()
  })
})
