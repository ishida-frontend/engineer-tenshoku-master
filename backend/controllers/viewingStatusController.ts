import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import express from 'express'

const prisma = new PrismaClient()

import { ViewingStatusApplicationService } from '../application/viewingStatus'

export class ViewingStatusController {
  static createViewingStatus = async (
    req: express.Request,
    res: express.Request,
  ) => {
    try {
      const statusData = req.body
      await ViewingStatusApplicationService.create(statusData)
    } catch (error: any) {
      throw error()
    } finally {
      await prisma.$disconnect()
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

  updateViewingStatus = async (req: express.Request, res: express.Response) => {
    try {
      const { newStatus, userId, videoId } = req.body
      await ViewingStatusApplicationService.update({
        newStatus,
        userId,
        videoId,
      })
      res.status(200)
    } catch (error) {
      res.status(500)
      throw error
    }
  }
}
