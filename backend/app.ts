import mysql from 'mysql'
import express from 'express'
import cors from 'cors'
import router from './routes/router'

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

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
