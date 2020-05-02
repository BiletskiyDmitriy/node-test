import { dbInterface } from '../core'
import { ObjectId } from 'mongodb'

export default {
  list: () => {
    return dbInterface.getCollection('users').find().toArray()
  },
  retrieveById: (id) => {
    return dbInterface.getCollection('users').findOne(ObjectId(id))
  },
  create: (user) => {
    return dbInterface.getCollection('users').insertOne(user)
  },
  update: (id, user) => {
    return dbInterface.getCollection('users').updateOne({ _id: ObjectId(id) }, user)
  },
  delete: (id) => {
    return dbInterface.getCollection('users').deleteOne({ _id: ObjectId(id) })
  }
}
