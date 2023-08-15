import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { Configuration } from '@entities/configuration'

export class Config {
  private readonly configPath: string
  private readonly config: Configuration | null

  constructor(customPath?: string) {
    this.configPath = customPath
      ? this.ensureJsonExtension(customPath)
      : path.join(os.homedir(), '.shadowvault', 'config.json')

    this.config = this.loadConfig(this.configPath)
  }

  private ensureJsonExtension(filePath: string): string {
    return filePath.endsWith('.json') ? filePath : `${filePath}.json`
  }

  private loadConfig(filePath: string): Configuration | null {
    if (!fs.existsSync(filePath)) {
      console.warn(`Config file not found at ${filePath}`)
      return null
    }

    const rawData = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(rawData)
  }

  public getConfig(): Configuration | null {
    return this.config
  }

  public setConfig<T extends keyof Configuration>(
    key: T,
    value: Configuration[T],
  ): void {
    this.config[key] = value
  }
}
