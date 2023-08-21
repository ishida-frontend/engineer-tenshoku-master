import express from 'express'
import { createTag } from '../scripts/createTag'
import { readAllTag, readTag, readFilteredTag } from '../scripts/readTag'
import { updateTag, updateFilteredTag } from '../scripts/updateTag'
import { deleteTag } from '../scripts/deleteTag'

exports.checkCreateTag = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await createTag()
    res.send('新しいタグが作成されました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkReadTag = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await readTag()
    await readFilteredTag()
    res.send('1件のタグを読み込みました!')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkReadAllTag = async function (
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

exports.checkUpdateTag = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await updateTag()
    await updateFilteredTag()
    res.send('1件のタグを更新しました!<br>複数のタグを更新しました')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkDeleteTag = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await deleteTag()
    res.send('1件のタグを削除しました!')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
