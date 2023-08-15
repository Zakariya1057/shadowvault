import {
  S3,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { S3Client } from '@libs/storage-client/s3-client'
import * as fs from 'fs'

jest.mock('@aws-sdk/client-s3')
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  createWriteStream: jest.fn(),
}))

describe('S3Client', () => {
  const mockBucket = 'testBucket'
  let s3Client: S3Client

  beforeEach(() => {
    ;(S3 as jest.Mock).mockClear()
    s3Client = new S3Client({}, mockBucket)
  })

  describe('upload', () => {
    it('should successfully upload a file', async () => {
      const mockName = 'testFile.txt'
      const mockBody = 'test content'

      await s3Client.upload(mockName, mockBody)

      expect(S3.prototype.send).toHaveBeenCalledWith(
        expect.any(PutObjectCommand),
      )
    })

    it('should handle upload errors', async () => {
      const mockName = 'testFile.txt'
      const mockBody = 'test content'

      ;(S3.prototype.send as jest.Mock).mockRejectedValueOnce(
        new Error('Upload failed'),
      )

      await s3Client.upload(mockName, mockBody)

      expect(S3.prototype.send).toHaveBeenCalledWith(
        expect.any(PutObjectCommand),
      )
    })
  })

  describe('download', () => {
    it('should successfully download a file', async () => {
      const mockName = 'testFile.txt'
      const mockDestination = 'destinationPath.txt'

      const mockReadableStream = new (require('stream').Readable)()
      mockReadableStream._read = () => {}
      ;(S3.prototype.send as jest.Mock).mockResolvedValueOnce({
        Body: mockReadableStream,
      })

      const mockWriteStream = new (require('stream').Writable)()
      mockWriteStream._write = (_, _1, done) => {
        done()
      }
      ;(fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream)

      await s3Client.download(mockName, mockDestination)

      expect(S3.prototype.send).toHaveBeenCalledWith(
        expect.any(GetObjectCommand),
      )
    })

    it('should handle download errors', async () => {
      const mockName = 'testFile.txt'
      const mockDestination = 'destinationPath.txt'

      ;(S3.prototype.send as jest.Mock).mockRejectedValueOnce(
        new Error('Download failed'),
      )

      await s3Client.download(mockName, mockDestination)

      expect(S3.prototype.send).toHaveBeenCalledWith(
        expect.any(GetObjectCommand),
      )
      // Additional error handling checks can be added
    })
  })

  describe('listFilesInFolder', () => {
    it('should return a list of files', async () => {
      const mockFolderPrefix = 'testFolder/'
      const mockResponse = {
        Contents: [{ Key: 'testFile1.txt' }, { Key: 'testFile2.txt' }],
      }

      ;(S3.prototype.send as jest.Mock).mockResolvedValueOnce(mockResponse)

      const files = await s3Client.listFilesInFolder(mockFolderPrefix)

      expect(files).toEqual(['testFile1.txt', 'testFile2.txt'])
      expect(S3.prototype.send).toHaveBeenCalledWith(
        expect.any(ListObjectsV2Command),
      )
    })

    it('should handle errors while listing files', async () => {
      const mockFolderPrefix = 'testFolder/'

      ;(S3.prototype.send as jest.Mock).mockRejectedValueOnce(
        new Error('List failed'),
      )

      await expect(
        s3Client.listFilesInFolder(mockFolderPrefix),
      ).rejects.toThrow('List failed')
      expect(S3.prototype.send).toHaveBeenCalledWith(
        expect.any(ListObjectsV2Command),
      )
    })
  })
})
