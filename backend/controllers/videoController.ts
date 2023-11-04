import express from 'express'
import z from 'zod'

import { createVideo } from '../scripts/createVideo'
import { readVideo, readFilteredVideos } from '../scripts/readVideo'
import { updateVideo } from '../scripts/updateVideo'
import { deleteVideo } from '../scripts/deleteVideo'

export class VideoController {
  createVideo = async function (req: express.Request, res: express.Response) {
    try {
      const videoData = req.body
      await createVideo(videoData)
      res.status(201).json({ message: '正常に追加されました' })
    } catch (e) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }

  readVideo = async function (req: express.Request, res: express.Response) {
    try {
      const video = await readVideo(req.params.id)
      res.status(200).json(video)
    } catch (e) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました。' })
    }
  }

  readFilteredVideos = async function (
    req: express.Request,
    res: express.Response,
  ) {
    try {
      const filteredVideos = await readFilteredVideos()
      res.status(200).json(filteredVideos)
    } catch (e) {
      res.status(500).send('エラーが発生しました')
    }
  }

  updateVideo = async function (req: express.Request, res: express.Response) {
    try {
      const { id, name, description, order, url, published } = req.body

      await updateVideo({ id, name, description, order, url, published })
      res.status(201).json({ message: '正常に更新されました' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues[0].message })
      }
    }
  }

  deleteVideo = async function (req: express.Request, res: express.Response) {
    try {
      const { id } = req.body

      await deleteVideo(id)
      res.status(201).json({
        message: '正常に削除されました',
      })
    } catch (e) {
      res.status(500).json({ message: 'サーバー内部エラーが発生しました' })
    }
  }
}
