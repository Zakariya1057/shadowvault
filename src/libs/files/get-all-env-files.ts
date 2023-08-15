import * as fs from 'fs'
import * as path from 'path'

export const getAllEnvFiles = (): string[] => {
  const currentDir = process.cwd()
  const allFiles = fs.readdirSync(currentDir)
  const envFiles = allFiles.filter((file) => file.startsWith('.env'))
  return envFiles.map((file) => path.join(currentDir, file))
}
