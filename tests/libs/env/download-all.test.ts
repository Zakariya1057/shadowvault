import * as ConstructFolderName from '@utils/file/construct-folder-name'
import { ioc } from '@utils/ioc'
import * as DownloadLib from '@libs/env/download'
import * as ExtractFilename from '@utils/file/extract-filename'
import { downloadAll } from '@libs/env/download-all'
import { CommandOptions } from '@entities/command-options'

jest.mock('@utils/ioc')

describe('downloadAllTest', () => {
  const mockFolderName = 'mockedFolder'
  const mockFilesList = [
    'mockedFolder/mockFile1.env',
    'mockedFolder/mockFile2.env',
  ]
  const mockExtractedName = 'mockFile.env'
  let mockCloudStorageClient: any

  beforeEach(() => {
    // Reset all mock implementations
    jest.resetAllMocks()

    // Mock constructFolderName
    jest
      .spyOn(ConstructFolderName, 'constructFolderName')
      .mockReturnValue(mockFolderName)

    // Mock CloudStorageClient's listFilesInFolder method
    mockCloudStorageClient = {
      listFilesInFolder: jest.fn().mockResolvedValue(mockFilesList),
    }

    // Mock ioc.get
    ;(ioc.get as jest.Mock).mockReturnValue(mockCloudStorageClient)

    // Mock download
    jest.spyOn(DownloadLib, 'download').mockImplementation(jest.fn())

    // Mock extractFilename
    jest
      .spyOn(ExtractFilename, 'extractFilename')
      .mockReturnValue(mockExtractedName)
  })

  it('should correctly list and download all environment files', async () => {
    const mockOptions = {} as CommandOptions

    await downloadAll(mockOptions)

    // Check if folder name construction was called correctly
    expect(ConstructFolderName.constructFolderName).toHaveBeenCalledWith(
      mockOptions,
    )

    // Check if CloudStorageClient's listFilesInFolder method was called correctly
    expect(mockCloudStorageClient.listFilesInFolder).toHaveBeenCalledWith(
      mockFolderName,
    )

    // Check if files are extracted and downloaded correctly
    mockFilesList.forEach((file) => {
      expect(ExtractFilename.extractFilename).toHaveBeenCalledWith(file)
      expect(DownloadLib.download).toHaveBeenCalledWith(
        mockExtractedName,
        mockOptions,
      )
    })
  })
})
