import express from 'express'

import { FavoriteVideoApplicationService } from '../application/favoriteVideo'

export class FavoriteVideoController {
  upsertFavoriteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const { isFavorited, userId, videoId } = req.body
      const favoriteStatus = await FavoriteVideoApplicationService.upsert({
        isFavorited,
        userId,
        videoId,
      })
      res.status(200).json(favoriteStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  getFavoriteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const { userId, videoId } = req.params
      const favoriteStatus = await FavoriteVideoApplicationService.get({
        userId,
        videoId,
      })
      res.status(200).json(favoriteStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }
}
