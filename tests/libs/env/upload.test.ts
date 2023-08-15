import { ioc } from '@utils/ioc'
import { validateFileExists } from '@utils/validators/validate-file-exists'
import { getFileContents } from '@utils/file/get-file-contents'
import { constructFilename } from '@utils/file/construct-filename'
import { CloudStorageClient } from '@entities/cloud-storage-client'
import { upload } from '@libs/env/upload'
import { Provider } from '@entities/provider'
import { CommandOptions } from '@entities/command-options'

jest.mock('@utils/validators/validate-file-exists')
jest.mock('@utils/file/get-file-contents')
jest.mock('@utils/file/construct-filename')
jest.mock('@utils/ioc')

describe('uploadTest', () => {
  let mockCloudStorageClient: Partial<CloudStorageClient>

  beforeEach(() => {
    mockCloudStorageClient = {
      upload: jest.fn(),
    }
    ;(ioc.get as jest.Mock).mockReturnValue(mockCloudStorageClient)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should validate file exists, get its contents and then upload it to cloud storage', async () => {
    const mockFilename = 'test.txt'
    const mockLocation = 'constructed/location/test.txt'
    const mockFileContents = 'file contents here'

    const mockOptions: CommandOptions = {
      name: 'test',
      stage: 'production',
      provider: Provider.S3,
    }

    ;(constructFilename as jest.Mock).mockReturnValue(mockLocation)
    ;(getFileContents as jest.Mock).mockResolvedValue(mockFileContents)

    await upload(mockFilename, mockOptions)

    expect(validateFileExists).toHaveBeenCalledWith(mockFilename)
    expect(constructFilename).toHaveBeenCalledWith(mockFilename, mockOptions)
    expect(getFileContents).toHaveBeenCalledWith(mockFilename)
    expect(mockCloudStorageClient.upload).toHaveBeenCalledWith(
      mockLocation,
      mockFileContents,
    )
  })

  it('should throw an error if filename is not provided', async () => {
    await expect(
      upload('', { name: 'test', stage: 'production', provider: Provider.S3 }),
    ).rejects.toThrow('A filename is mandatory for the operation.')
  })
})
