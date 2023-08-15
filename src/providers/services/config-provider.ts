import { TYPES } from '../types'
import { ioc } from '@src/utils/ioc'
import { Config } from '@libs/config/config'

export const register = async () => {
  const config = new Config()
  ioc.bind<Config>(TYPES.Services.Config).toConstantValue(config)
}
