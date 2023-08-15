export interface CloudStorageClient {
  upload(name: string, body: string): Promise<void>
  download(name: string, destination: string): Promise<void>
  listFilesInFolder(folderPrefix: string): Promise<string[]>
}
