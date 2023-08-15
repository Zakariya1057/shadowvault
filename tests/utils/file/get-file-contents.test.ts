import * as fs from 'fs/promises'
import { getFileContents } from '@utils/file/get-file-contents'

jest.mock('fs/promises')

describe('getFileContents', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should successfully read the file contents', async () => {
    const mockFilePath = 'testPath.txt'
    const mockFileContent = 'This is a test content'

    ;(fs.readFile as jest.Mock).mockResolvedValue(mockFileContent)

    const result = await getFileContents(mockFilePath)

    expect(result).toEqual(mockFileContent)
    expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf8')
  })

  it('should throw an error if there is an issue reading the file', async () => {
    const mockFilePath = 'testPath.txt'
    const mockError = new Error('File not found')

    ;(fs.readFile as jest.Mock).mockRejectedValue(mockError)

    await expect(getFileContents(mockFilePath)).rejects.toThrowError(
      `Error reading file: ${mockError.message}`,
    )

    expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf8')
  })
})
