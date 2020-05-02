import express from 'express'
import fileUpload from 'express-fileupload'
import { config } from 'dotenv'
import { initRouter, dbInterface } from './core/index'
import routes from './routes'

const app = express()
config()

const { APP_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

dbInterface.connect(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT).then(() => {
  console.info('Connected to db')
}).catch((err) => {
  console.error(err)
})

app.use(express.json())
app.use(fileUpload())
initRouter(app, routes)

app.listen(APP_PORT || 3030, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('HTTP server started')
  }
})

process.on('SIGINT', () => {
  dbInterface.close()
  process.exit()
})
