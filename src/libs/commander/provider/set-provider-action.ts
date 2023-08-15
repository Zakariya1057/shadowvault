import { Provider } from '@entities/provider'
import { validateProviderOption } from '@libs/commander/validate/validate-provider-option'
import * as S3ClientProvider from '@providers/clients/s3-client-provider'
import { ioc } from '@utils/ioc'
import { Config } from '@libs/config/config'
import { TYPES } from '@providers/types'

export const setProviderAction = (provider: Provider): void => {
  validateProviderOption(provider)

  if (provider === Provider.S3) {
    S3ClientProvider.register()
  }

  ioc.get<Config>(TYPES.Services.Config).setConfig('provider', provider)
}
