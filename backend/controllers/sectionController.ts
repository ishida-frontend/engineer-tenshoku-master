import express from 'express'
import { createSection } from '../scripts/createSection'
import { readOrderedSections } from '../scripts/readSection'
import { deleteSection } from '../scripts/deleteSection'

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
    const result = await readOrderedSections(req.params.course_id)
    res.json(result)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
exports.sectionDelete = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await deleteSection(req.params.id)
    res.send('１件のビデオを削除しました')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
