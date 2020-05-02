import { ObjectId } from 'mongodb'
import { ValidationError } from '../core/index'

export const ValidateID = async ({ _id }) => {
  try {
    if (typeof _id !== 'string' || new ObjectId(_id).toString() !== _id) {
      throw new ValidationError('Invalid ID param')
    }
  } catch (e) {
    throw new ValidationError('Invalid ID param')
  }
}
