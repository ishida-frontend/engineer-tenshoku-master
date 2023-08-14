import express, { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { readAllContacts } from '../scripts/readContact'
import { createContact } from '../scripts/createContact'

const prisma = new PrismaClient()
const router = express.Router()

exports.checkCreateContact = async function (req: Request, res: Response) {
  try {
    console.log('req.body', req.body)
    await createContact(req.body)
    res.send('新しいお問い合わせが作成されました！')
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

export default router
