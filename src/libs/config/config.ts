import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { Config as ConfigEntity } from '@src/entities/config'

export class Config {
  private readonly configPath: string
  private readonly config: ConfigEntity | null

  constructor(customPath?: string) {
    this.configPath = customPath
      ? this.ensureJsonExtension(customPath)
      : path.join(os.homedir(), '.shadowvault', 'config.json')

    this.config = this.loadConfig(this.configPath)
  }

  private ensureJsonExtension(filePath: string): string {
    return filePath.endsWith('.json') ? filePath : `${filePath}.json`
  }

  private loadConfig(filePath: string): ConfigEntity | null {
    if (!fs.existsSync(filePath)) {
      console.warn(`Config file not found at ${filePath}`)
      return null
    }

    const rawData = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(rawData)
  }

  public getConfig(): ConfigEntity | null {
    return this.config
  }
}
