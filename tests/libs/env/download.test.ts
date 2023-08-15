import * as ConstructFilename from '@utils/file/construct-filename'
import { ioc } from '@utils/ioc'
import * as ExtractFilename from '@utils/file/extract-filename'
import { CommandOptions } from '@entities/command-options'
import { download } from '@libs/env/download'

jest.mock('@utils/ioc')

describe('downloadTest', () => {
  const mockLocation = 'mockedFolder/mockFile.env'
  const mockExtractedName = 'mockFile.env'
  let mockCloudStorageClient: any

  beforeEach(() => {
    // Reset all mock implementations
    jest.resetAllMocks()

    // Mock CloudStorageClient's download method
    mockCloudStorageClient = {
      download: jest.fn().mockResolvedValue(undefined),
    }

    // Mock ioc.get
    ;(ioc.get as jest.Mock).mockReturnValue(mockCloudStorageClient)

    // Mock constructFilename
    jest
      .spyOn(ConstructFilename, 'constructFilename')
      .mockReturnValue(mockLocation)

    // Mock extractFilename
    jest
      .spyOn(ExtractFilename, 'extractFilename')
      .mockReturnValue(mockExtractedName)
  })

  it('should correctly download the specified file', async () => {
    const mockFilename = 'mockFile.env'
    const mockOptions = {} as CommandOptions

    await download(mockFilename, mockOptions)

    // Check if filename was constructed correctly
    expect(ConstructFilename.constructFilename).toHaveBeenCalledWith(
      mockFilename,
      mockOptions,
    )

    // Check if destination was extracted correctly
    expect(ExtractFilename.extractFilename).toHaveBeenCalledWith(mockFilename)

    // Check if CloudStorageClient's download method was called correctly
    expect(mockCloudStorageClient.download).toHaveBeenCalledWith(
      mockLocation,
      mockExtractedName,
    )
  })
})
