import * as fs from 'fs/promises'

export const getFileContents = async (
  filePath: string,
): Promise<string | null> => {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`)
  }
}
