import express from 'express'
import { AdvertisementApplicationService } from '../application/advertisement'

export class AdvertisementController {
  private advertisementApplicationService: AdvertisementApplicationService
  constructor() {
    this.advertisementApplicationService = new AdvertisementApplicationService()
  }
  async createAdvertisement(req: express.Request, res: express.Response) {
    try {
      const advertisementData = req.body
      await this.advertisementApplicationService.createAdvertisement(
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
        await this.advertisementApplicationService.getAdvertisement(
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
        await this.advertisementApplicationService.getAdvertisements()
      res.status(200).json(advertisements)
    } catch (e) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました' })
    }
  }

  async updateAdvertisement(req: express.Request, res: express.Response) {
    try {
      const advertisementData = req.body
      await this.advertisementApplicationService.updateAdvertisement(
        advertisementData,
      )
      res.status(201).json({ message: '正常に広告情報が更新されました' })
    } catch (error) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました' })
    }
  }

  async deleteAdvertisement(req: express.Request, res: express.Response) {
    try {
      const { advertisementId } = req.body
      await this.advertisementApplicationService.deleteAdvertisement(
        advertisementId,
      )
      res.status(201).json({ message: '広告情報が削除されました' })
    } catch (error) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました' })
    }
  }
}
