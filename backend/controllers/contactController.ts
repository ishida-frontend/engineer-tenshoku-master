import express, { Request, Response } from 'express'
import { readAllContacts } from '../scripts/readContact'
import { createContact } from '../scripts/createContact'

const router = express.Router()

exports.checkCreateContact = async function (req: Request, res: Response) {
  try {
    await createContact(req.body)
    res.send('新しいお問い合わせが作成されました！')
  } catch (e) {
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
  } catch (e) {
    res.status(500).send('エラーが発生しました')
  }
}

export default router
