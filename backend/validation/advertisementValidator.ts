import express from 'express'
import { z } from 'zod'

export class AdvertisementValidator {
  createAdvertisement = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const advertisementCreateSchema = z
      .object({
        name: z.string().min(1, { message: '※必須項目です' }),
        url: z
          .string()
          .url({ message: '※URLの形式で入力してください' })
          .startsWith('https://', {
            message: '※https://の形式で入力してください',
          }),
        author: z.string().min(1, { message: '※必須項目です' }),
        imageUrl: z.string().min(1, { message: '※必須項目です' }),
        startFrom: z
          .string()
          .datetime()
          .refine(
            (val) => {
              return val.length > 0
            },
            { message: '日付を選択してください' },
          ),
        endAt: z
          .string()
          .datetime()
          .refine(
            (val) => {
              return val.length > 0
            },
            { message: '日付を選択してください' },
          ),
      })
      .refine(
        (args) => {
          const { startFrom, endAt } = args
          // 終了日が開始日より未来かどうか
          return new Date(endAt) > new Date(startFrom)
        },
        {
          message: '※終了日は開始日より未来の日付にしてください',
          path: ['endAt'],
        },
      )

    try {
      throw new Error('バックエンドでエラーが発生')
      // const advertisementData = advertisementCreateSchema.safeParse(req.body)

      // if (advertisementData.success) {
      //   next()
      // } else {
      //   res
      //     .status(400)
      //     .json({ errors: advertisementData.error.formErrors.fieldErrors })
      // }
    } catch (e) {
      console.log('Error', e)
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
}
