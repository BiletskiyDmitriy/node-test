import { NotFoundError } from '../core/response-errors'

export const NotFound =  () => {
  throw new NotFoundError('API does not exist')
}
