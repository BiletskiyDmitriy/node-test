import { ValidationError } from '../../core'

export const CheckFileExtension = async ({ avatar, background }) => {
  if (avatar && !avatar.mimetype.startsWith('image/')) {
    throw new ValidationError('Avatar should be an image')
  }
  if (background && !background.mimetype.startsWith('image/')) {
    throw new ValidationError('Background should be an image')
  }
}
