import express from 'express'
import { GoodVideoApplicationService } from '../application/goodVideo'

export class GoodVideoController {
  // GoodVideoApplicationServiceのインスタンスを保持するためのプライベート変数を宣言
  private goodVideoApplicationService: GoodVideoApplicationService

  // GoodVideoApplicationServiceのインスタンスを初期化するコンストラクタ
  constructor() {
    this.goodVideoApplicationService = new GoodVideoApplicationService()
  }

  // videoIdに対するいいねの数を取得するメソッド
  async getLikeCount(req: express.Request, res: express.Response) {
    try {
      // リクエストパラメータからvideoIdを取得
      const { videoId } = req.params
      // GoodVideoApplicationServiceのgetLikeCountメソッドを呼び出していいね数を取得
      const likeCount = await this.goodVideoApplicationService.getLikeCount(
        videoId,
      )
      // 取得したいいね数を含むJSONレスポンスを送信し、HTTPステータスを200（OK）に設定
      res.status(200).json(likeCount)
    } catch (error) {
      // エラーが発生した場合は、HTTPステータスを500（Internal Server Error）に設定し、エラーを返す
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
  // いいねを追加するExpressのルートハンドラー関数
  async goodVideo(req: express.Request, res: express.Response) {
    try {
      // リクエストボディからuserIdとvideoIdを取得
      const { userId, videoId } = req.body
      // GoodVideoApplicationServiceのgoodVideoメソッドを呼び出していいねの操作を実行
      await this.goodVideoApplicationService.goodVideo(userId, videoId)
      // 成功を示すJSONレスポンスを送信し、HTTPステータスを200（OK）に設定
      res.status(200).json({ message: 'いいねをしました' })
    } catch (error) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
  // いいねを取り消すExpressのルートハンドラー関数
  async cancelGoodVideo(req: express.Request, res: express.Response) {
    try {
      const { userId, videoId } = req.body
      // GoodVideoApplicationServiceのcancelGoodVideoメソッドを呼び出していいねの取り消し操作を実行
      await this.goodVideoApplicationService.cancelGoodVideo(userId, videoId)
      res.status(200).json({ message: 'いいねをキャンセルしました' })
    } catch (error) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
}
