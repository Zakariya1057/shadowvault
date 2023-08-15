import { extractFilename } from '@utils/file/extract-filename'

describe('extractFilename', () => {
  it('should extract the filename from a full path', () => {
    const testLocation = '/home/user/documents/testFile.txt'

    const result = extractFilename(testLocation)

    expect(result).toEqual('testFile.txt')
  })

  it('should return the last folder if path does not have a file', () => {
    const testLocation = '/home/user/documents/folderName'

    const result = extractFilename(testLocation)

    expect(result).toEqual('folderName')
  })

  it('should return the entire string if no "/" is present', () => {
    const testLocation = 'testFile.txt'

    const result = extractFilename(testLocation)

    expect(result).toEqual('testFile.txt')
  })

  it('should return an empty string if the path ends with a "/"', () => {
    const testLocation = '/home/user/documents/'

    const result = extractFilename(testLocation)

    expect(result).toEqual('')
  })

  it('should handle empty location', () => {
    const testLocation = ''

    const result = extractFilename(testLocation)

    expect(result).toEqual('')
  })
})
