import express from 'express'
import { QuestionApplicationService } from '../application/question'

export class QuestionController {
  async create(req: express.Request, res: express.Response) {
    try {
      const { title, content, video_id, user_id } = req.body
      console.log('req.body:', req.body)
      const data = await QuestionApplicationService.create({
        title,
        content,
        video_id,
        user_id,
      })
      res.send('新しい質問が公開されました！')
      res.status(200).json(data)
    } catch (error) {
      res.status(500).send('エラーが発生しました')
      throw error
    }
  }
  async get(req: express.Request, res: express.Response) {
    try {
      const data = await QuestionApplicationService.get(req.params.video_id)
      return res.status(200).json(data)
    } catch (error) {
      throw error
    }
  }
}
