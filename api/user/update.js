import UserDao from '../../dao/user'
import fs from '../../services/fileService'
import { folders } from '../../constants'

export const UserUpdate = async (newUser) => {
  const user = await UserDao.retrieveById(newUser._id)
  let { avatar, background, username } = user

  if (newUser.avatar) {
    avatar = await fs.replaceFile(newUser.avatar, folders.avatar, user.avatar)
  }
  if (newUser.background) {
    background = await fs.replaceFile(newUser.background, folders.background, user.background)
  }
  if (newUser.username) {
    username = newUser.username
  }

  const result = await UserDao.update(newUser._id, {
    $set: {
      avatar,
      background,
      username
    }
  })

  return { ok: result.modifiedCount === 1 }
}
