import { z } from 'zod'
export const advertisementSchema = z
  .object({
    name: z.string().min(1, { message: '※必須項目です' }),
    url: z
      .string()
      .url({ message: '※URLの形式で入力してください' })
      .startsWith('https://', {
        message: '※URLはhttpsで始めてください',
      }),
    author: z.string().min(1, { message: '※必須項目です' }),
    isShow: z.boolean(),
    imageUrl: z.string(),
    startFrom: z.date(),
    endAt: z.date(),
  })
