import { MongoClient } from 'mongodb'
import { ServerError } from './response-errors'

const connection = Symbol('connection')

export const dbInterface = {
  connect(dbName, user, password, host, port) {
    const url = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`

    return MongoClient.connect(url, { useUnifiedTopology: true }).then((db) => {
      this[connection] = db.db(dbName)
    })
  },
  getCollection(collection) {
    if (!this[connection]) {
      throw new ServerError('Database connection has not been established')
    }
    return this[connection].collection(collection)
  },
  close() {
    if (this[connection]) {
      this[connection].close()
    }
  }
}
