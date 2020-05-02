import path from 'path'
import fs from 'fs'
import { generateFileName, getFileExtension } from '../helpers'

export default {
  async saveFile(file, folder) {
    const fileExtension = getFileExtension(file.name)
    const fileName = generateFileName(fileExtension)
    const fullPath = path.join(__dirname, '..', folder, fileName)

    return new Promise((resolve, reject) => {
      file.mv(fullPath, (err) => {
        if (err) {
          reject(err)
        }
        resolve(path.join(folder, fileName))
      })
    })
  },
  async deleteFile(filePath) {
    const fullPath = path.join(__dirname, '..', filePath)

    return new Promise((resolve, reject) => {
      fs.unlink(fullPath, (err) => {
        if (err) {
          // reject(err) // TODO
        }
        resolve()
      })
    })
  },
  async replaceFile(file, folder, oldFilePath) {
    await this.deleteFile(oldFilePath)
    return this.saveFile(file, folder)
  }
}
