import { z } from 'zod'
export const registerSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスの形式で入力してください',
  }),
  password: z
    .string()
    .min(8, { message: '8桁以上のパスワードを入力してください' })
    .regex(
      /^(?=.*[!-/:-@[-`{-~])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[!-~]{8,}$/,
      {
        message:
          '英大文字、英小文字、数字、記号を1文字以上含む形で入力してください',
      },
    ),
})
