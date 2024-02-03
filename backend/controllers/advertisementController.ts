import express from 'express'
import { AdvertisementApplicationService } from '../application/advertisement'

export class AdvertisementController {
  private advertisementApplicationServise: AdvertisementApplicationService
  constructor(){
    this.advertisementApplicationServise = new AdvertisementApplicationService()
  }
  createAdvertisement(req: express.Request, res: express.Response){
    try {
      const advertisementData = req.body
      this.advertisementApplicationServise.createAdvertisement(advertisementData)
      res.status(201).json({ message: '正常に広告情報を追加しました' })
    } catch (e) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }
}
