import express from 'express'
import { UserApplicationService } from '../application/user'

export class UserController {
  async get(req: express.Request, res: express.Response) {
    try {
      const data = await UserApplicationService.get(req.params.id)
      return res.status(200).json(data)
    } catch (error) {
      throw error
    }
  }
}
