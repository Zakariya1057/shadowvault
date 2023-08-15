import { TYPES } from '../types'
import { S3Client } from '@src/libs/s3/s3-client'
import { ioc } from '@src/utils/ioc'
import { S3ClientConfig } from '@aws-sdk/client-s3'
import { Config } from '@libs/config/config'

export const register = async () => {
  const { aws } = ioc.get<Config>(TYPES.Services.Config).getConfig()

  const config: S3ClientConfig = {
    credentials: {
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
    },
    region: aws.region,
  }

  const client = new S3Client(config, 'shadowvault-env')
  ioc.bind<S3Client>(TYPES.Clients.S3).toConstantValue(client)
}
