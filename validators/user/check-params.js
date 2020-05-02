import Joi from '@hapi/joi'
import { ValidationError } from '../../core'

export const userCreateSchema = Joi.object({
  username: Joi.string().required(),
  avatar: Joi.object().required(),
  background: Joi.object().required()
}).unknown(false)

export const userUpdateSchema = Joi.object({
  _id: Joi.string().required(),
  username: Joi.string(),
  avatar: Joi.object(),
  background: Joi.object()
}).unknown(false)

export const CheckParams = (schema) => {
  return async (user) => {
    const { error } = schema.validate(user)
    if (error) {
      throw new ValidationError(error.message)
    }
  }
}
