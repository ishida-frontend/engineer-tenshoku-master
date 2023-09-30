import express from 'express'
import {
  fetchViewingStatus,
  updateViewingStatus,
} from '../application/viewingStatusService'

export class ViewingStatusController {
  getViewingStatus = async (req: express.Request, res: express.Response) => {
    try {
      const viewingStatus = await fetchViewingStatus(
        req.params.userId,
        req.params.videoId,
      )
      res.json({ viewingStatus })
    } catch (error: any) {
      throw error()
    }
  }

  changeViewingStatus = async (req: express.Request, res: express.Response) => {
    try {
      console.log('req:', req.body)
      const { userId, videoId, newStatus } = req.body

      await updateViewingStatus({ userId, videoId, newStatus })
      res.status(201)
    } catch (error: any) {
      res.status(500)
    }
  }
}
