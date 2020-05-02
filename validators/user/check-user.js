import { NotFoundError } from '../../core'
import UserDao from '../../dao/user'

export const CheckUser = async ({ _id }) => {
  const user = await UserDao.retrieveById(_id)

  if (!user) {
    throw new NotFoundError('User not found')
  }
}
