import express from 'express'
import { QuestionApplicationService } from '../application/question'

export class QuestionController {
  async create(req: express.Request, res: express.Response) {
    try {
      const { title, content, video_id, user_id } = req.body
      await QuestionApplicationService.create({
        title,
        content,
        video_id,
        user_id,
      })
      res.status(200).json({ message: '質問が公開されました' })
    } catch (error) {
      res.status(500).json({ message: '質問作成時にエラーが発生しました' })
      throw error
    }
  }
  async get(req: express.Request, res: express.Response) {
    try {
      const data = await QuestionApplicationService.get(req.params.video_id)
      return res.status(200).json(data)
    } catch (error) {
      throw new Error(`QuestionController: get question error: ${error}`)
    }
  }
}
