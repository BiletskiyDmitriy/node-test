import { ValidationError } from '../../core'

const maxFileSizeInMb = 3
const maxFileSize = maxFileSizeInMb * 1000000

export const CheckFileSize = async ({ avatar, background }) => {
  if (avatar && avatar.size > maxFileSize) {
    throw new ValidationError(`Max file size is ${maxFileSizeInMb}Mb`)
  }

  if (background && background.size > maxFileSize) {
    throw new ValidationError(`Max file size is ${maxFileSizeInMb}Mb`)
  }
}
