import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { Config } from '@libs/config/config'
import { Configuration } from '@entities/configuration'
import { Provider } from '@entities/provider'

jest.mock('fs')
jest.mock('os')

describe('Config', () => {
  let defaultPath: string
  let mockConfigData: Configuration

  beforeEach(() => {
    mockConfigData = {
      aws: {
        bucket: '',
        accessKeyId: '',
        secretAccessKey: '',
        region: '',
      },
      provider: Provider.S3,
      bucket: '',
    }
    ;(os.homedir as jest.Mock).mockReturnValue('/mocked/home/dir')

    defaultPath = path.join('/mocked/home/dir', '.shadowvault', 'config.json')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    it('should set default config path when custom path is not provided', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockConfigData),
      )

      const config = new Config()

      expect((config as any).configPath).toBe(defaultPath)
    })

    it('should set custom path with json extension when provided', () => {
      const customPath = '/custom/path/config'
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockConfigData),
      )

      const config = new Config(customPath)

      expect((config as any).configPath).toBe(`${customPath}.json`)
    })

    it('should set custom path when it already has a json extension', () => {
      const customPath = '/custom/path/config.json'
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockConfigData),
      )

      const config = new Config(customPath)

      expect((config as any).configPath).toBe(customPath)
    })

    it('should throw error if config not found', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)

      expect(() => new Config('path')).toThrow('Config file not found at path')
    })
  })

  describe('loadConfig', () => {
    it('should load configuration if config file exists', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockConfigData),
      )

      const config = new Config()

      expect(config.getConfig()).toEqual(mockConfigData)
    })
  })

  describe('setConfig', () => {
    it('should set the configuration for a given key', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockConfigData),
      )

      const config = new Config()
      config.setConfig('bucket', 'newName')

      expect(config.getConfig()?.bucket).toBe('newName')
    })
  })
})
