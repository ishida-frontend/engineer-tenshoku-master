import express from 'express'
import { createSection } from '../scripts/createSection'

export const checkCreateSection = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await createSection({
      courseId: 1,
      order: 1,
      title: 'JS環境構築',
      published: true,
    })
    res.send('新しいセクションが作成されました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
