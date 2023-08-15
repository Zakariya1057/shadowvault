import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3,
  S3ClientConfig,
} from '@aws-sdk/client-s3'
import * as fs from 'fs'
import { Readable } from 'stream'

export class S3Client {
  private client: S3
  private readonly bucket: string

  constructor(config: S3ClientConfig = {}, bucket: string) {
    this.client = new S3(config)
    this.bucket = bucket
  }

  public upload = async (name: string, body: string): Promise<void> => {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: name,
      Body: body,
    })

    try {
      await this.client.send(command)
      console.log(
        `Successfully uploaded as '${name}' to bucket '${this.bucket}'.`,
      )
    } catch (err) {
      console.error(
        `Failed to upload file '${name}' to S3 Bucket '${this.bucket}':`,
        err.message,
      )
    }
  }

  public download = async (
    name: string,
    destination: string,
  ): Promise<void> => {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: name,
    })

    try {
      const response = await this.client.send(command)

      if (response?.Body instanceof Readable) {
        const writeStream = fs.createWriteStream(destination)
        response.Body.pipe(writeStream)

        writeStream.on('finish', () => {
          console.log(
            `Downloaded file '${name}' from bucket '${this.bucket}' to ${destination}.`,
          )
        })
        writeStream.on('error', (writeErr) => {
          console.error(
            `Error while writing the file '${name}' to destination '${destination}':`,
            writeErr.message,
          )
        })
      } else {
        console.warn(
          `No stream data in the S3 response for file '${name}'. Not saved.`,
        )
      }
    } catch (err) {
      console.error(
        `Failed to download file '${name}' from S3 Bucket '${this.bucket}':`,
        err.message,
      )
    }
  }

  public listFilesInFolder = async (
    folderPrefix: string,
  ): Promise<string[]> => {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: folderPrefix,
    })

    try {
      const response = await this.client.send(command)

      if (response.Contents) {
        return response.Contents.map((item) => item.Key || '')
      }
      return []
    } catch (err) {
      console.error(
        `Failed to list files in folder '${folderPrefix}' from S3 Bucket '${this.bucket}':`,
        err.message,
      )
      throw err
    }
  }
}
