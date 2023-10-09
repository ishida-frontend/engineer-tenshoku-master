import express from 'express'

import { FavoriteVideoApplicationService } from '../application/favoriteVideo'

export class FavoriteVideoController {
  upsertFavoriteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const { isFavorited, userId, courseId, videoId } = req.body
      const FavoriteStatus = await FavoriteVideoApplicationService.upsert({
        isFavorited,
        courseId,
        userId,
        videoId,
      })
      res.status(200).json(FavoriteStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  getFavoriteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const { userId, courseId, videoId } = req.params
      const favoriteStatus = await FavoriteVideoApplicationService.get({
        userId,
        courseId,
        videoId,
      })
      res.status(200).json(favoriteStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }
}
