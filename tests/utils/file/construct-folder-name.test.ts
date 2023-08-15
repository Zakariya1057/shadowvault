import { constructFolderName } from '@utils/file/construct-folder-name'
import { CommandOptions } from '@entities/command-options'
import { Provider } from '@entities/provider'

describe('constructFolderName', () => {
  it('should construct a folder name using name and stage', () => {
    const testOptions: CommandOptions = {
      name: 'testName',
      stage: 'dev',
      provider: Provider.S3,
    }

    const result = constructFolderName(testOptions)

    expect(result).toEqual('testName/dev')
  })

  it('should handle empty name and stage', () => {
    const testOptions: CommandOptions = {
      name: '',
      stage: '',
      provider: Provider.S3,
    }

    const result = constructFolderName(testOptions)

    expect(result).toEqual('/')
  })

  it('should handle only name being provided', () => {
    const testOptions: CommandOptions = {
      name: 'testName',
      stage: '',
      provider: Provider.S3,
    }

    const result = constructFolderName(testOptions)

    expect(result).toEqual('testName/')
  })

  it('should handle only stage being provided', () => {
    const testOptions: CommandOptions = {
      name: '',
      stage: 'dev',
      provider: Provider.S3,
    }

    const result = constructFolderName(testOptions)

    expect(result).toEqual('/dev')
  })
})
