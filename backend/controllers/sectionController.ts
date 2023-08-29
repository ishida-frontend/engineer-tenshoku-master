import express from 'express'
import { createSection } from '../scripts/createSection'
import { readFilteredSections } from '../scripts/readSection'

export const sectionCreate = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await createSection(req.body)
    res.send('新しいセクションが作成されました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
exports.sectionRead = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    console.log('req.body', req.body)
    const result = await readFilteredSections(req.body)
    console.log('result', result)
    res.json(result)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
