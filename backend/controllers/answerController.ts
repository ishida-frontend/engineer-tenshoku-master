import express from 'express'
import { AnswerApplicationService } from '../application/answer'

export class AnswerController {
  async create(req: express.Request, res: express.Response) {
    try {
      const { comment, question_id, user_id } = req.body
      const data = await AnswerApplicationService.create({
        comment,
        question_id,
        user_id,
      })
      return res.status(200).json(data)
    } catch (error) {
      throw error
    }
  }
  async get(req: express.Request, res: express.Response) {
    try {
      const data = await AnswerApplicationService.get(req.params.question_id)
      return res.status(200).json(data)
    } catch (error) {
      throw error
    }
  }
}
