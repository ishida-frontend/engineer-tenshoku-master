import express from 'express'
import { createTag } from '../scripts/createTag'

exports.createTag = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const tag = await createTag()
    res.json(tag)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}