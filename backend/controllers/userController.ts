import express from 'express'
import z from 'zod'

import { UserApplicationService } from '../application/user'

export class UserController {
  async get(req: express.Request, res: express.Response) {
    try {
      const data = await UserApplicationService.get(req.params.id)
      return res.status(200).json(data)
    } catch (error) {
      throw new Error(`UserController: get user error: ${error}`)
    }
  }

  async update(req: express.Request, res: express.Response) {
    try {
      const data = await UserApplicationService.update(req.body)
      return res.status(200).json(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues[0].message })
      }
    }
  }
}
