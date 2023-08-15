import * as ConfigProvider from './services/config-provider'

export const register = async () => {
  await ConfigProvider.register()
}
