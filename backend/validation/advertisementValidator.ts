import express from 'express'
import { z } from 'zod'

export class AdvertisementValidator {
  createAdvertisement = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log('req.body', req.body)
    const advertisementCreateSchema = z.object({
      name: z.string(),
      url: z.string(),
      author: z.string(),
      isShow: z.boolean(),
      imageUrl: z.string(),
      startFrom: z.string().datetime(),
      endAt: z.string().datetime(),
    })

    const advertisementData = advertisementCreateSchema.safeParse(req.body)

    if (advertisementData.success) {
      next()
    } else {
      console.log('advertisementData', advertisementData)
      res
        .status(400)
        .json({ errors: advertisementData.error.formErrors.fieldErrors })
    }
  }
}
