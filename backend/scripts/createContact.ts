import express from 'express'
import { PrismaClient } from '@prisma/client'
import { check, validationResult } from 'express-validator'
import { ContactType } from '../types/index'
const prisma = new PrismaClient()
const app = express()
const bodyParser = require('body-parser')

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000)
console.log('Server is online.')

app.post('http://localhost:3000/contact', function (req, res) {
  // リクエストボディを出力
  console.log('req.body', req.body)
  // パラメータ名、nameを出力
  console.log('req.body.name', req.body.name)

  res.send('POST request to the homepage')
})

type createContactParamsType = {
  name: string
  email: string
  subject: string
  message: string
  status: number
}

export async function createContact(params: createContactParamsType) {
  try {
    const contactData: createContactParamsType = {
      name: 'Tarou Yamada',
      email: 'yamada0123@example.com',
      subject: 'I like your videos.',
      message: 'Thank you very much.',
      status: 0,
    }

    const errors = validationResult(contactData)

    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((error) => error.msg)
          .join(', '),
      )
    } else {
      const createdContact = await prisma.contact.create({
        data: {
          name: contactData.name ?? '',
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
          status: contactData.status,
        },
      })
    }
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
