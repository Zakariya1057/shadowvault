import { Provider } from '@entities/provider'

export const validateProviderOption = (provider: string) => {
  if (!Object.values(Provider).includes(provider as Provider)) {
    throw new Error(`Provider ${provider} is not supported.`)
  }
}
