import express from 'express'

import { ViewingStatusApplicationService } from '../application/viewingStatus'

export class ViewingStatusController {
  updateViewingStatus = async (req: express.Request, res: express.Response) => {
    try {
      const { isWatched, userId, videoId } = req.body
      const viewingStatus = await ViewingStatusApplicationService.update({
        isWatched,
        userId,
        videoId,
      })
      res.status(201).json(viewingStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  getViewingStatus = async (req: express.Request, res: express.Response) => {
    try {
      const { userId, videoId } = req.params
      const viewingStatus = await ViewingStatusApplicationService.get({
        userId,
        videoId,
      })
      res.status(200).json(viewingStatus)
    } catch (error) {
      res.status(500)
      throw error
    }
  }

  getViewingStatuses = async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.params
      const viewingStatuses = await ViewingStatusApplicationService.getAll(
        userId,
      )
      res.status(200).json(viewingStatuses)
    } catch (error) {
      res.status(500)
      throw error
    }
  }
}
