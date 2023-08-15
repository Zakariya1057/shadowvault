import * as S3ClientProvider from './clients/s3-client-provider'
import * as ConfigProvider from './services/config-provider'

export const register = async () => {
  await ConfigProvider.register()
  await S3ClientProvider.register()
}
