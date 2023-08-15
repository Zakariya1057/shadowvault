export const extractFilename = (location: string): string => {
  return location.split('/').pop()
}
