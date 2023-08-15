import * as fs from 'fs'
import { strict } from 'assert'

export const validateFileExists = (filePath: string): void => {
  strict(fs.existsSync(filePath), `File does not exist: ${filePath}`)
}
