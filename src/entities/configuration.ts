import { AWSConfig } from '@entities/aws-config'
import { Provider } from '@entities/provider'

export interface Configuration {
  aws: AWSConfig
  provider: Provider
  bucket: string
}
