import express from 'express'
import { AnswerApplication } from '../application/answer'

export class AnswerController {
  async create(req: express.Request, res: express.Response) {
    try {
      const { comment, question_id, user_id } = req.params
      const data = await AnswerApplication.create({
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
      const data = await AnswerApplication.get(req.params.question_id)
      return res.status(200).json(data)
    } catch (error) {
      throw error
    }
  }
}
