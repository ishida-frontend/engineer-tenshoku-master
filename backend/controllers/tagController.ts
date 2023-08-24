import express from 'express'
import { readAllTag } from '../scripts/readTag'

exports.readAllTag = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const tag = await readAllTag()
    res.json(tag)
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
