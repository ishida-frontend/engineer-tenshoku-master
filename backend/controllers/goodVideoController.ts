import express from 'express'
import { GoodVideoApplicationService } from '../application/goodVideo'

export class GoodVideoController {
  private goodVideoApplicationService: GoodVideoApplicationService

  constructor() {
    this.goodVideoApplicationService = new GoodVideoApplicationService()
    this.goodVideo = this.goodVideo.bind(this)
    this.getGoodCount = this.getGoodCount.bind(this)
  }

  async getGoodCount(req: express.Request, res: express.Response) {
    try {
      const { videoId } = req.params
      const goodCount = await this.goodVideoApplicationService.getGoodCount(
        videoId,
      )
      res.status(200).json(goodCount)
    } catch (error) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
  async goodVideo(req: express.Request, res: express.Response) {
    try {
      const { userId, videoId } = req.body

      await this.goodVideoApplicationService.goodVideo(userId, videoId)
      res.status(200).json({ message: 'いいねをしました' })
    } catch (error) {
      res.status(500).json({ message: 'いいねした際にエラーが発生しました' })
    }
  }
}
