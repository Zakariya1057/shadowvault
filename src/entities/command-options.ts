import { Provider } from '@entities/provider'

export interface CommandOptions {
  name: string
  stage: string
  provider: Provider
  all?: boolean
}
