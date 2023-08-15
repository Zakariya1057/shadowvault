import * as fs from 'fs'
import * as path from 'path'
import { getLocalProjectName } from '@libs/files/get-local-project-name'

jest.mock('fs')
jest.mock('path')

describe('getLocalProjectNameTest', () => {
  const mockPackageJsonPath = '/mock/project/directory/package.json'

  beforeEach(() => {
    ;(path.join as jest.Mock).mockReturnValue(mockPackageJsonPath)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the project name from package.json if it exists', () => {
    ;(fs.existsSync as jest.Mock).mockReturnValue(true)
    ;(fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ name: 'mock-project' }),
    )

    const result = getLocalProjectName()

    expect(result).toBe('mock-project')
    expect(fs.existsSync).toHaveBeenCalledWith(mockPackageJsonPath)
    expect(fs.readFileSync).toHaveBeenCalledWith(mockPackageJsonPath, 'utf-8')
  })

  it('should return null if package.json exists but does not have a name property', () => {
    ;(fs.existsSync as jest.Mock).mockReturnValue(true)
    ;(fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({}))

    const result = getLocalProjectName()

    expect(result).toBeNull()
    expect(fs.existsSync).toHaveBeenCalledWith(mockPackageJsonPath)
    expect(fs.readFileSync).toHaveBeenCalledWith(mockPackageJsonPath, 'utf-8')
  })

  it('should return undefined if package.json does not exist', () => {
    ;(fs.existsSync as jest.Mock).mockReturnValue(false)

    const result = getLocalProjectName()

    expect(result).toBeUndefined()
    expect(fs.existsSync).toHaveBeenCalledWith(mockPackageJsonPath)
    expect(fs.readFileSync).not.toHaveBeenCalled()
  })
})
