import express from 'express'

import { createVideo } from '../scripts/createVideo'
import {
  readVideo,
  readVideos,
  readFilteredVideos,
} from '../scripts/readVideo'
import { updateVideo, updateVideos } from '../scripts/updateVideo'
import { deleteVideo, deleteVideos } from '../scripts/deleteVideo'

export class VideoController {
  createVideo = async function (req: express.Request, res: express.Response) {
    try {
      const videoData = req.body

      await createVideo(videoData)

      res.status(201).json({ message: '動画が登録されました！' })
    } catch (e: any) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }

  readAllVideos = async function (req: express.Request, res: express.Response) {
    try {
      const videos = await readVideos()
      res.status(200).json(videos)
    } catch (e: any) {
      res.status(500).send('エラーが発生しました')
    }
  }

  updateVideo = async function (req: express.Request, res: express.Response) {
    try {
      await updateVideo(7)
      await updateVideos()
      res.send('１件のビデオを更新しました！<br>複数のビデオを更新しました！')
    } catch (e: any) {
      res.status(500).send('エラーが発生しました')
    }
  }

  deleteVideo = async function (req: express.Request, res: express.Response) {
    try {
      await deleteVideo(3)
      await deleteVideos(13, 15)
      res.send('１件のビデオを削除しました！<br>複数のビデオを削除しました！')
    } catch (e: any) {
      res.status(500).send('エラーが発生しました')
    }
  }
}
