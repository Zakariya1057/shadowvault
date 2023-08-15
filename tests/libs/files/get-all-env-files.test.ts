import * as fs from 'fs'
import * as path from 'path'
import { getAllEnvFiles } from '@libs/files/get-all-env-files'

jest.mock('fs')
jest.mock('path')

describe('getAllEnvFiles', () => {
  beforeEach(() => {
    ;(path.join as jest.Mock).mockImplementation((...args) => args.join('/'))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a list of all .env files in the current directory', () => {
    const mockFiles = [
      'file1.txt',
      '.env.production',
      'file2.json',
      '.env.development',
      '.env',
    ]
    const expectedFiles = ['.env.production', '.env.development', '.env'].map(
      (fileName) => path.join(process.cwd(), fileName),
    )

    ;(fs.readdirSync as jest.Mock).mockReturnValue(mockFiles)

    const result = getAllEnvFiles()

    expect(result).toEqual(expectedFiles)
  })

  it('should return an empty array if there are no .env files in the directory', () => {
    const mockFiles = ['file1.txt', 'file2.json']
    ;(fs.readdirSync as jest.Mock).mockReturnValue(mockFiles)

    const result = getAllEnvFiles()

    expect(result).toEqual([])
  })
})
