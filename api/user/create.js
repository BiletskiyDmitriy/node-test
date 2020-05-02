import UserDao from '../../dao/user'
import { folders } from '../../constants'
import fs from '../../services/fileService'

export const UserCreate = async (user) => {
  const avatar = await fs.saveFile(user.avatar, folders.avatar)
  const background = await fs.saveFile(user.background, folders.background)

  const result = await UserDao.create({
    username: user.username,
    avatar,
    background
  })

  return { ok: result.insertedCount === 1 }
}
