import { z } from 'zod'
export const advertisementSchema = z
  .object({
    name: z.string().min(1, { message: '※必須項目です' }),
    url: z
      .string()
      .url({ message: '※URLの形式で入力してください' })
      .startsWith('https://', {
        message: '※https://の形式で入力してください',
      }),
    author: z.string().min(1, { message: '※必須項目です' }),
    isShow: z.boolean(),
    imageUrl: z.string(),
    startFrom: z.string().refine(
      (val) => {
        return val.length > 0
      },
      { message: '日付を選択してください' },
    ),
    endAt: z.string().refine(
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
      message: '終了日は開始日より未来の日付にしてください',
      path: ['endAt'],
    },
  )
