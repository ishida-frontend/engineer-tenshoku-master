import { createVideo } from '../scripts/createVideo'
import { readVideo, readVideos, readFilteredVideos } from '../scripts/readVideo'
import { updateVideo, updateVideos } from '../scripts/updateVideo'
import { deleteVideo, deleteVideos } from '../scripts/deleteVideo'

exports.checkCreateVideo = async function(req: any, res: any) {
  console.log("req", req);
  try {
    await createVideo(1);
    res.send('新しいビデオが作成されました！');
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkReadVideo = async function(req: any, res: any) {
  try {
    await readVideo(2);
    await readVideos();
    await readFilteredVideos(4);
    res.send(
      '１件のビデオを読み込みました！<br>全てのビデオを読み込みました！<br>条件指定のビデオを読み込みました！'
    );
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkUpdateVideo = async function(req: any, res: any) {
  try {
    await updateVideo(5);
    await updateVideos();
    res.send(
      '１件のビデオを更新しました！<br>複数のビデオを更新しました！'
    );
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkDeleteVideo = async function(req: any, res: any) {
  try {
    await deleteVideo(8);
    await deleteVideos(10, 12);
    res.send(
      '１件のビデオを削除しました！<br>複数のビデオを削除しました！'
    )
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

