export const validateFilename = (filename: string) => {
  if (!filename) {
    console.error('Error: A filename is mandatory for the operation.')
    process.exit(1)
  }
}
