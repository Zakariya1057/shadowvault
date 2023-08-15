import * as fs from 'fs'
import * as path from 'path'

export const getLocalProjectName = (): string | null => {
  const packageJsonPath = path.join(process.cwd(), 'package.json')

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    return packageJson.name ?? null
  }
}
