import express from 'express'

import { FavoriteVideoApplicationService } from '../application/favoriteVideo'

export class FavoriteVideoController {
  upsertFavoriteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const { favoritedStatus, userId, videoId } = req.body
      const newStatus = await FavoriteVideoApplicationService.upsert({
        favoritedStatus,
        userId,
        videoId,
      })
      res.status(200).json(newStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  getFavoriteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const { userId, videoId } = req.params
      const fetchedStatus = await FavoriteVideoApplicationService.get({
        userId,
        videoId,
      })
      res.status(200).json(fetchedStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  getFavoriteVideos = async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.params
      const favoriteVideos = await FavoriteVideoApplicationService.getAll({
        userId,
      })
      res.status(200).json(favoriteVideos)
    } catch (error) {
      res.status(500)
      throw error
    }
  }
}
