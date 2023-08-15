import { CommandOptions } from '@entities/command-options'
import { constructFilename } from '@utils/file/construct-filename'
import * as ConstructFolderName from '@utils/file/construct-folder-name'

const constructFolderNameSpy = jest.spyOn(
  ConstructFolderName,
  'constructFolderName',
)

describe('constructFilename', () => {
  // Renamed for consistency
  beforeEach(() => {
    constructFolderNameSpy.mockClear()
  })

  afterAll(() => {
    constructFolderNameSpy.mockRestore() // Restore original function after all tests
  })

  it('should construct a filename with provided folder name and filename', () => {
    const mockFolderName = 'mockedFolder'
    const testFilename = 'testFile.txt'
    const testOptions = {} as CommandOptions

    constructFolderNameSpy.mockReturnValue(mockFolderName)

    const result = constructFilename(testFilename, testOptions)

    expect(result).toEqual(`${mockFolderName}/${testFilename}`)
    expect(constructFolderNameSpy).toHaveBeenCalledWith(testOptions) // Use the spy here
  })
})
