import { check, validationResult } from 'express-validator'
import { z } from 'zod'

export const contactValidationRules = z.object({
  name: z.string().min(5, { message: '名前は5文字以上必要です。' }),
  email: z
    .string()
    .min(5, { message: 'メールは5文字以上必要です。' })
    .email({ message: '有効なメールアドレスの形式で入力してください。' }),
  subject: z.string().min(6, { message: 'タイトルは6文字以上必要です。' }),
  message: z.string().min(6, { message: '内容は6文字以上必要です。' }),
})

export type ContactValidationRules = z.infer<typeof contactValidationRules>

// export const contactValidationRules = [
//   check('name').not().isEmpty().withMessage('名前は必須です。'),
//   check('email')
//     .not()
//     .isEmpty()
//     .withMessage('メールアドレスは必須です。')
//     .isEmail()
//     .withMessage('有効なメールアドレスの形式で入力してください。'),
//   check('subject').not().isEmpty().withMessage('件名は必須です。'),
//   check('message').not().isEmpty().withMessage('メッセージは必須です。'),
//   check('status').isIn([0]).withMessage('無効なステータス値です。'),
// ]
