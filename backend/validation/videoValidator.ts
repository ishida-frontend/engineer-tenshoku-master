import express from 'express'
import { z } from 'zod'

export class VideoValidator {
  createVideo = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const videoCreateSchema = z.object({
      name: z.string().min(5, { message: '※5文字以上で入力してください' }),
      description: z
        .string()
        .min(15, { message: '※15文字以上で入力してください' }),
      url: z.string().url({
        message: '※URLの形式で入力してください',
      }),

      sectionId: z.number().positive(),
    })

    const videoData = videoCreateSchema.safeParse(req.body)

    if (videoData.success) {
      next()
    } else {
      res.status(400).json({ errors: videoData.error.formErrors.fieldErrors })
    }
  }

  updateVideo = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const videoUpdateSchema = z.object({
      name: z.string().min(5, { message: '※5文字以上で入力してください' }),
      description: z
        .string()
        .min(15, { message: '※15文字以上で入力してください' }),
      order: z.number().positive(),
      url: z.string().url({
        message: '※URLの形式で入力してください',
      }),
    })

    const videoData = videoUpdateSchema.safeParse(req.body)

    if (videoData.success) {
      next()
    } else {
      res.status(400).json({ errors: videoData.error.formErrors.fieldErrors })
    }
  }
}
