import express from 'express'
import { createSection } from '../scripts/createSection'
import { readOrderedSections } from '../scripts/readSection'
import { deleteSection } from '../scripts/deleteSection'
import { updateSections } from '../scripts/updateSection'

export const sectionCreate = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await createSection(req.body)
    return res.status(201).json({ message: 'セクションが保存されました' })
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'セクション保存でエラーが発生しました' })
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
    res.status(500).json({ message: '一覧読み込みにエラーが発生しました' })
  }
}

exports.sectionUpdate = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await updateSections(req.body)
    return res.status(201).json({ message: 'セクションが保存されました' })
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: 'セクション保存でエラーが発生しました' })
  }
}

exports.sectionDelete = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    console.log('req.body', req.body)
    await deleteSection(req.body.id)
    res.status(201).json({ message: '削除されました' })
  } catch (e: any) {
    res.status(500).json({ message: 'セクション削除でエラーが発生しました' })
  }
}
