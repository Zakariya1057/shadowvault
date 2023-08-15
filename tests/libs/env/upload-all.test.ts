import { getAllEnvFiles } from '@libs/files/get-all-env-files'
import { upload } from '@libs/env/upload'
import { extractFilename } from '@utils/file/extract-filename'
import { uploadAll } from '@libs/env/upload-all'
import { CommandOptions } from '@entities/command-options'
import { Provider } from '@entities/provider'

jest.mock('@libs/files/get-all-env-files')
jest.mock('@libs/env/upload')
jest.mock('@utils/file/extract-filename')

describe('uploadAllTest', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should upload all the .env files retrieved from getAllEnvFiles', async () => {
    const mockEnvFiles = [
      '/path/to/.env.production',
      '/path/to/.env.development',
    ]
    const mockExtractedFilenames = ['.env.production', '.env.development']

    const mockOptions: CommandOptions = {
      name: 'test',
      stage: 'production',
      provider: Provider.S3,
    }

    ;(getAllEnvFiles as jest.Mock).mockReturnValue(mockEnvFiles)
    ;(extractFilename as jest.Mock).mockImplementation((path: string) => {
      if (path === mockEnvFiles[0]) return mockExtractedFilenames[0]
      if (path === mockEnvFiles[1]) return mockExtractedFilenames[1]
      return ''
    })

    await uploadAll(mockOptions)

    expect(getAllEnvFiles).toHaveBeenCalledTimes(1)
    expect(extractFilename).toHaveBeenCalledTimes(mockEnvFiles.length)
    expect(upload).toHaveBeenCalledTimes(mockEnvFiles.length)

    mockEnvFiles.forEach((file, index) => {
      expect(extractFilename).toHaveBeenCalledWith(file)
      expect(upload).toHaveBeenCalledWith(
        mockExtractedFilenames[index],
        mockOptions,
      )
    })
  })

  it('should not call upload or extractFilename if there are no .env files', async () => {
    const mockOptions: CommandOptions = {
      name: 'test',
      stage: 'production',
      provider: Provider.S3,
    }

    ;(getAllEnvFiles as jest.Mock).mockReturnValue([])

    await uploadAll(mockOptions)

    expect(getAllEnvFiles).toHaveBeenCalledTimes(1)
    expect(extractFilename).not.toHaveBeenCalled()
    expect(upload).not.toHaveBeenCalled()
  })
})
