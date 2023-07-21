import { PrismaClient } from '@prisma/client'
import { check, validationResult } from 'express-validator';

const prisma = new PrismaClient();

export async function createContact() {
  try {
    // データのバリデーションルールを定義
    const contactValidationRules = [
      check('name').isEmpty().withMessage('名前は必須です。'),
      check('email').isEmpty().withMessage('メールアドレスは必須です。').not().isEmail().withMessage('有効なメールアドレスの形式で入力してください。'),
      check('subject').isEmpty().withMessage('件名は必須です。'),
      check('message').isEmpty().withMessage('メッセージは必須です。'),
      check('status').isIn([ 0 ]).withMessage('無効なステータス値です。'),
    ];

    // 型宣言と実際のデータを設定
    type Contact = {name?: string, email: string, subject: string, message: string, status: number};
    const contactData: Contact = {
      name: undefined,
      email: "yamada0123@example.com",
      subject: "I like your videos.",
      message: "Thank you very much.",
      status: 0,
    };
    // バリデーションの実行
    const result = await Promise.all(contactValidationRules.map(validationRule => validationRule.run(contactData)));
    // console.log("result", result);
    // バリデーションエラーをチェック
    const errors = validationResult(result);
    console.log("errors", errors.array());

    if (!errors.isEmpty()) {
      throw new Error(errors.array().map(error => error.msg).join(', '));
    } else {
      console.log("aaaa");
      // データの作成
      const createdContact = await prisma.contact.create({
        data: {
          name: contactData.name ?? '',
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
          status: contactData.status,
        },
      });
      console.log("createdContact", createdContact);
    }
  } catch (e: any) {
    console.log(e.message);
  } finally {
    await prisma.$disconnect();
  }
}
