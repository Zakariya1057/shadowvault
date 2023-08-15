import * as fs from 'fs'
import { validateFileExists } from '@utils/validators/validate-file-exists'

// Mocking the fs module
jest.mock('fs')

describe('validateFileExists', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should not throw an error when file exists', () => {
    ;(
      fs.existsSync as jest.MockedFunction<typeof fs.existsSync>
    ).mockReturnValue(true)

    expect(() => {
      validateFileExists('existing-file-path.txt')
    }).not.toThrow()
  })

  it('should throw an error when file does not exist', () => {
    ;(
      fs.existsSync as jest.MockedFunction<typeof fs.existsSync>
    ).mockReturnValue(false)

    expect(() => {
      validateFileExists('non-existing-file-path.txt')
    }).toThrow('File does not exist: non-existing-file-path.txt')
  })
})
