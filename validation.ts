import { check, validationResult } from 'express-validator';

  // お問い合わせ
  export const contactValidationRules = [
    check('name').not().isEmpty().withMessage('名前は必須です。'),
    check('email').not().isEmpty().withMessage('メールアドレスは必須です。').not().isEmail().withMessage('有効なメールアドレスの形式で入力してください。'),
    check('subject').not().isEmpty().withMessage('件名は必須です。'),
    check('message').not().isEmpty().withMessage('メッセージは必須です。'),
    check('status').not().isIn([ 0 ]).withMessage('無効なステータス値です。'),
  ];
