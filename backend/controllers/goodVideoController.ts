import express from 'express'
import { GoodVideoApplicationService } from '../application/goodVideo'

export class GoodVideoController {
  private goodVideoApplicationService: GoodVideoApplicationService

  constructor() {
    this.goodVideoApplicationService = new GoodVideoApplicationService()
  }

  async getLikeCount(req: express.Request, res: express.Response) {
    try {
      const { videoId } = req.params
      const likeCount =
        await GoodVideoController.goodVideoApplicationService.getLikeCount(
          videoId,
        )
      res.status(200).json(likeCount)
    } catch (error) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
  async goodVideo(req: express.Request, res: express.Response) {
    try {
      const { userId, videoId } = req.body
      console.log('userId', userId)

      await GoodVideoApplicationService.goodVideo(userId, videoId)
      res.status(200).json({ message: 'いいねをしました' })
    } catch (error) {
      console.log('error: ', error)
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
  async cancelGoodVideo(req: express.Request, res: express.Response) {
    try {
      const { userId, videoId } = req.body
      await this.goodVideoApplicationService.cancelGoodVideo(userId, videoId)
      res.status(200).json({ message: 'いいねをキャンセルしました' })
    } catch (error) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
}
