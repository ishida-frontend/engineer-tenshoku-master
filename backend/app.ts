import express from 'express'
import cors from 'cors'
import router from './routes/router'
import authController from './controllers/authController'
import cookieParser from 'cookie-parser'

// HTTPサーバを起動する
const port = process.env.SERVER_PORT || 8000
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)

// Note: JSONボディパーサーのミドルウェアを追加
app.use(express.json())
// Note: cookieを使えるようにするためのモジュール追加
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/auth', authController)
app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
