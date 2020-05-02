function generateRandomHash() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getFileExtension(fileName) {
  return fileName.match(/^.*?\.(\w{2,5})$/)[1]
}
export function generateFileName(fileExtension) {
  return `${generateRandomHash()}-${Date.now()}.${fileExtension}`
}
