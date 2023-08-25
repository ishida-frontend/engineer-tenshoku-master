import express from 'express'
import { createSection } from '../scripts/createSection'

export const sectionCreateController = async function (
  req: express.Request,
  res: express.Response,
) {
  console.log('req.body', req.body)
  try {
    await createSection(req.body)
    res.send('新しいセクションが作成されました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
