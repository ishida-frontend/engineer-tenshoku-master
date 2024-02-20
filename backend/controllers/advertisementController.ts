import express from 'express'
import { AdvertisementApplicationService } from '../application/advertisement'

export class AdvertisementController {
  private advertisementApplicationServise: AdvertisementApplicationService
  constructor() {
    this.advertisementApplicationServise = new AdvertisementApplicationService()
  }
  async createAdvertisement(req: express.Request, res: express.Response) {
    try {
      const advertisementData = req.body
      await this.advertisementApplicationServise.createAdvertisement(
        advertisementData,
      )
      res.status(201).json({ message: '正常に広告情報を追加しました' })
    } catch (e) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }

  
  async getAdvertisement(req: express.Request, res: express.Response) {
    try {
      const advertisement =
        await this.advertisementApplicationServise.getAdvertisement(
          req.params.id,
        )
      res.status(200).json(advertisement)
    } catch (e) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました' })
    }
  }
  async getAdvertisements(req: express.Request, res: express.Response) {
    try {
      const advertisements =
        await this.advertisementApplicationServise.getAdvertisements()
      res.status(200).json(advertisements)
    } catch (e) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました' })
    }
  }

  async updateAdvertisement(req: express.Request, res: express.Response) {
    try {
      const advertisementData = req.body
      await this.advertisementApplicationServise.updateAdvertisement(
        advertisementData,
      )
      res.status(201).json({ message: '正常に広告情報が更新されました' })
    } catch (error) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました' })
    }
  }
}
