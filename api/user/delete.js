import UserDao from '../../dao/user'
import fs from '../../services/fileService'

export const UserDelete = async ({ _id }) => {
  const user = await UserDao.retrieveById(_id)
  const result = await UserDao.delete(_id)
  await fs.deleteFile(user.avatar)
  await fs.deleteFile(user.background)

  return { ok: result.deletedCount === 1 }
}
