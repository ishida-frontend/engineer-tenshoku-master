import express from 'express'
import { createSection } from '../scripts/createSection'
import { readFilteredSections } from '../scripts/readSection'
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
    const result = await readFilteredSections(req.params.course_id)
    res.json(result)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
exports.sectionDelete = async function (
  req: express.Request,
  res: express.Response,
) {
  console.log('req.body', req.body)
  console.log('req.params', req.params)
  console.log('req.params.course_id', req.params.course_id)
  console.log('req.params.order', req.params.order)
  try {
    await deleteSection(req.params.course_id, req.params.order)
    res.send('１件のビデオを削除しました')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
