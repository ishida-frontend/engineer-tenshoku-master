import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { createVideo } from '../scripts/createVideo'
import { readVideo, readVideos, readFilteredVideos } from '../scripts/readVideo'
import { updateVideo, updateVideos } from '../scripts/updateVideo'
import { deleteVideo, deleteVideos } from '../scripts/deleteVideo'

exports.checkCreateVideo = function(req: any, res: any) {
  try {
    createVideo(1);
    res.send('新しいビデオが作成されました！');
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkReadVideo = function(req: any, res: any) {
  try {
    readVideo(2);
    readVideos();
    readFilteredVideos(4);
    res.send(
      '１件のビデオを読み込みました！<br>全てのビデオを読み込みました！<br>条件指定のビデオを読み込みました！'
    );
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkUpdateVideo = function(req: any, res: any) {
  try {
    updateVideo(5);
    updateVideos();
    res.send(
      '１件のビデオを更新しました！<br>複数のビデオを更新しました！'
    );
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkDeleteVideo = function(req: any, res: any) {
  try {
    deleteVideo(8);
    deleteVideos(10, 12);
    res.send(
      '１件のビデオを削除しました！<br>複数のビデオを削除しました！'
    )
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

