import { Provider } from '@entities/provider'
import { validateProviderOption } from '@libs/commander/validate/validate-provider-option'

describe('validateProviderOptionTest', () => {
  it('should not throw an error for supported providers', () => {
    const testWithProvider = (provider: Provider) => {
      expect(() => validateProviderOption(provider)).not.toThrow()
    }

    Object.values(Provider).forEach(testWithProvider)
  })

  it('should throw an error for unsupported providers', () => {
    const unsupportedProvider = 'unsupportedProvider'

    expect(() => validateProviderOption(unsupportedProvider)).toThrow(
      `Provider ${unsupportedProvider} is not supported.`,
    )
  })
})
