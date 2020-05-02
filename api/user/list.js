import UserDao from '../../dao/user'

export const UserList = async () => {
  return UserDao.list()
}
