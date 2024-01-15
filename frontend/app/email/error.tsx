import { z, ZodError } from 'zod'

const passwordSchema = z
  .string()
  .min(11, { message: '11文字以上入力してください' })
  .refine((password) => /[0-9]+/.test(password), {
    message: '数字を1文字以上使用してください',
  })
  .refine((password) => /[a-z]+/.test(password), {
    message: '英小文字を1文字以上使用してください',
  })
  .refine((password) => /[A-Z]+/.test(password), {
    message: '英大文字を1文字以上使用してください',
  })
  .refine((password) => /[@$!%*?&-]+/.test(password), {
    message: '特定の記号を1文字以上使用してください',
  })

const validatePassword = (password) => {
  try {
    passwordSchema.parse(password)
    return null
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((e) => e.message)
    }
    return ['パスワードの入力エラーが発生しました。']
  }
}
