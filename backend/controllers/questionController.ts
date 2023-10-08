import express from 'express'
import { QuestionApplication } from '../application/question'

export class QuestionController {
  async create(req: express.Request, res: express.Response) {
    try {
      const { title, content, video_id, user_id } = req.params
      console.log('req.params:', req.params)
      const data = await QuestionApplication.create({
        title,
        content,
        video_id,
        user_id,
      })
      return res.status(200).json(data)
    } catch (error) {
      throw error
    }
  }
  async get(req: express.Request, res: express.Response) {
    try {
      const data = await QuestionApplication.get(req.params.video_id)
      return res.status(200).json(data)
    } catch (error) {
      throw error
    }
  }
}
