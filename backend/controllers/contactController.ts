import express, { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { readAllContacts } from '../scripts/readContact'
import { createContact } from '../scripts/createContact'
import { validationResult } from 'express-validator'
import { ZodError, AnyZodObject } from 'zod'
import { contactValidationRules } from '../validation'

const prisma = new PrismaClient()
const router = express.Router()

exports.checkCreateContact = async function (req: Request, res: Response) {
  const validate =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('a')
        await schema.parseAsync({ ...req.body })
        console.log('b')
        console.log('req', req)
        console.log('res', res)
        console.log('c')
        return next()
      } catch (error) {
        console.log('d')
        if (error instanceof ZodError) {
          console.log('e')
          return res.status(500).send({
            error: error.flatten(),
          })
        }
      }
    }
  console.log('f')

  try {
    const result = validate(contactValidationRules)
    // console.log('g')
    // console.log('result', result)
    // if (エラーがない場合の条件)　{
    // await createContact(req.body)
    res.send('新しいお問い合わせが作成されました！')
    // }
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkReadContact = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const result = await readAllContacts()
    res.json(result)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkSuccessContact = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const id = req.query.id
    if (!id) {
      throw new Error('無効なコンタクトIDです。')
    }

    const contactData = await prisma.contact.findUnique({
      where: { id: Number(id) },
    })
    if (!contactData) {
      throw new Error('該当のIDが見つかりません。')
    }

    const slackMessage: { text: string } = {
      text: `【テスト】新しいお問合せが届きました。
メールアドレス：${contactData.email}
件名：${contactData.subject}
本文：${contactData.message}`,
    }

    const url: string = process.env.WEBHOOK_URL || 'default'
    const maxRetries = 3
    for (let i = 0; i < maxRetries; i++) {
      try {
        await axios.post(url, slackMessage)
        break
      } catch (error) {
        new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }

    res.status(200).send('お問合せを受け付けました。')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました。')
  }
}

export default router
