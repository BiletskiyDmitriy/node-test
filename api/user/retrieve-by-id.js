import UserDao from '../../dao/user'

export const UserRetrieveById = async ({ _id }) => {
  return UserDao.retrieveById(_id)
}
