import mysql from 'mysql'
import express from 'express'
import cors from 'cors'
import router from './routes/router'
import authController from './controllers/authController'
import cookieParser from 'cookie-parser'

// 環境変数を使用してDBにアクセスする
const pool = mysql.createPool({
  port: 3306,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

// HTTPサーバを起動する
const port = process.env.SERVER_PORT || 8000
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
)
// JSONボディパーサーのミドルウェアを追加
app.use(express.json())
// cookieを使えるようにするためのモジュール追加
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/auth', authController)
app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
