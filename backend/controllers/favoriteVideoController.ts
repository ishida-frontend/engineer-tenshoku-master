import express from 'express'

import { FavoriteVideoApplicationService } from '../application/favoriteVideo'

export class FavoriteVideoController {
  private favoriteVideoApplicationService: FavoriteVideoApplicationService
  constructor() {
    this.favoriteVideoApplicationService = new FavoriteVideoApplicationService()
  }
  upsertFavoriteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const { favoritedStatus, userId, videoId } = req.body
      console.log('req.body', req.body)
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
    console.log('getFavoriteVideo')
    try {
      const { userId, videoId } = req.params
      const fetchedStatus = await this.favoriteVideoApplicationService.get({
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
      const favoriteVideos =
        await this.favoriteVideoApplicationService.getfavoriteVideos()
      res.status(200).json(favoriteVideos)
      console.log('favoriteVideos', favoriteVideos)
    } catch (error) {
      res.status(500)
      throw error
    }
  }
}
