import express from 'express'
import { createVideo } from '../scripts/createVideo'
import { readVideo, readVideos, readFilteredVideos } from '../scripts/readVideo'
import { updateVideo, updateVideos } from '../scripts/updateVideo'
import { deleteVideo, deleteVideos } from '../scripts/deleteVideo'

export const checkCreateVideo = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    // await createVideo(1);
    res.send('新しいビデオが作成されました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkReadVideo = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await readVideo(2)
    await readVideos()
    await readFilteredVideos(4)
    res.send(
      '１件のビデオを読み込みました！<br>全てのビデオを読み込みました！<br>条件指定のビデオを読み込みました！',
    )
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkUpdateVideo = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await updateVideo(7)
    await updateVideos()
    res.send('１件のビデオを更新しました！<br>複数のビデオを更新しました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}

exports.checkDeleteVideo = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    await deleteVideo(3)
    await deleteVideos(13, 15)
    res.send('１件のビデオを削除しました！<br>複数のビデオを削除しました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました')
  }
}
