import express from 'express'
import { GoodVideoApplicationService } from '../application/goodVideo'

export class GoodVideoController {
  async getLikeCount(req: express.Request, res: express.Response) {
    try {
      const { videoId } = req.params
      const likeCount = await new GoodVideoApplicationService().getLikeCount(
        videoId,
      )
      res.status(200).json(likeCount)
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  async goodVideo(req: express.Request, res: express.Response) {
    try {
      const { userId, videoId } = req.body
      await new GoodVideoApplicationService().goodVideo(userId, videoId)
      res.status(200).json({ message: 'Good video' })
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  async cancelGoodVideo(req: express.Request, res: express.Response) {
    try {
      const { userId, videoId } = req.body
      await new GoodVideoApplicationService().cancelGoodVideo(userId, videoId)
      res.status(200).json({ message: 'Cancel good video' })
    } catch (error) {
      res.status(500)
      throw error
    }
  }
}
