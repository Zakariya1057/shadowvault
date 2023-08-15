import { TYPES } from '../types'
import { S3Client } from '@libs/storage-client/s3-client'
import { ioc } from '@utils/ioc'
import { S3ClientConfig } from '@aws-sdk/client-s3'
import { Config } from '@libs/config/config'
import { CloudStorageClient } from '@entities/cloud-storage-client'

export const register = () => {
  const { aws } = ioc.get<Config>(TYPES.Services.Config).getConfig()

  const config: S3ClientConfig = {
    credentials: {
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
    },
    region: aws.region,
  }

  const client = new S3Client(config, aws.bucket)
  ioc.bind<CloudStorageClient>(TYPES.Clients.Storage).toConstantValue(client)
}
