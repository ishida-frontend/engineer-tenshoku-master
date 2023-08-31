import express from 'express'

import { createVideo } from '../scripts/createVideo'
import { readVideo, readVideos, readFilteredVideos } from '../scripts/readVideo'
import { updateVideo, updateVideos } from '../scripts/updateVideo'
import { deleteVideo, deleteVideos } from '../scripts/deleteVideo'

export class VideoController {
  createVideo = async function (req: express.Request, res: express.Response) {
    try {
      const videoData = req.body
      console.log('videoData:', videoData)

      await createVideo(videoData)

      res.status(201).json({ message: '動画が追加されました' })
    } catch (e: any) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }

  readFilteredVideos = async function (
    req: express.Request,
    res: express.Response,
  ) {
    try {
      const filteredVideos = await readFilteredVideos()
      res.status(200).json(filteredVideos)
    } catch (e: any) {
      res.status(500).send('エラーが発生しました')
    }
  }

  updateVideo = async function (req: express.Request, res: express.Response) {
    try {
      const { id, name, description, order, url, published } = req.body

      await updateVideo({ id, name, description, order, url, published })
      res.status(200).json({ message: '変更が保存されました' })
    } catch (error) {
      // if (error instanceof z.ZodError) {
      //   return res.status(400).json({ error: error.issues[0].message })
    }
  }

  deleteVideo = async function (req: express.Request, res: express.Response) {
    try {
      const { id } = req.body

      await deleteVideo(id)
      res.status(201).json({
        message: '削除されました',
      })
    } catch (e: any) {
      res.status(500).json({ message: 'サーバー内部エラーが発生しました' })
    }
  }
}
