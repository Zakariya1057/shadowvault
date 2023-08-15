import { Provider } from '@entities/provider'
import { validateProviderOption } from '@libs/commander/validate/validate-provider-option'
import * as S3ClientProvider from '@providers/clients/s3-client-provider'
import { ioc } from '@utils/ioc'
import { Config } from '@libs/config/config'
import { setProviderAction } from '@libs/commander/provider/set-provider-action'

jest.mock('@libs/commander/validate/validate-provider-option')
jest.mock('@providers/clients/s3-client-provider')
jest.mock('@utils/ioc')

describe('setProviderAction', () => {
  let mockConfig: Partial<Config>

  beforeEach(() => {
    mockConfig = {
      setConfig: jest.fn(),
    }
    ;(ioc.get as jest.Mock).mockReturnValue(mockConfig)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should validate the provider', () => {
    setProviderAction(Provider.S3)

    expect(validateProviderOption).toHaveBeenCalledWith(Provider.S3)
  })

  it('should register S3 client provider if provider is S3', () => {
    setProviderAction(Provider.S3)

    expect(S3ClientProvider.register).toHaveBeenCalled()
  })

  it('should not register S3 client provider if provider is not S3', () => {
    // Mock a different provider for this test. Adjust as per your available providers.
    const mockProvider = 'mockProvider' as Provider

    setProviderAction(mockProvider)

    expect(S3ClientProvider.register).not.toHaveBeenCalled()
  })

  it('should set the provider in config', () => {
    setProviderAction(Provider.S3)

    expect(mockConfig.setConfig).toHaveBeenCalledWith('provider', Provider.S3)
  })
})
