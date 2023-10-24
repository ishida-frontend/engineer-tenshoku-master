import express from 'express'

import { ViewingStatusApplicationService } from '../application/viewingStatus'

export class ViewingStatusController {
  upsertViewingStatus = async (req: express.Request, res: express.Response) => {
    try {
      const { isWatched, userId, videoId } = req.body
      const viewingStatus = await ViewingStatusApplicationService.upsert({
        isWatched,
        userId,
        videoId,
      })
      res.status(200).json(viewingStatus)
    } catch (error) {
      console.log(error)
      res.status(500)
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
      console.log(error)
      res.status(500)
    }
  }

  getViewingStatuses = async (req: express.Request, res: express.Response) => {
    try {
      const { userId, courseId } = req.params
      const viewingStatuses = await ViewingStatusApplicationService.getAll(
        userId,
        courseId,
      )
      res.status(200).json(viewingStatuses)
    } catch (error) {
      console.log(error)
      res.status(500)
    }
  }
}
