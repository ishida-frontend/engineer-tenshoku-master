import { PrismaClient } from '@prisma/client'
import { check, validationResult } from 'express-validator';

const prisma = new PrismaClient();
const express = require('express');
const app = express();

export async function createContact() {
  try {
    // データのバリデーションルールを定義
    const contactValidationRules = [
      check('name').not().isEmpty().withMessage('名前は必須です。'),
      check('email').not().isEmpty().withMessage('メールアドレスは必須です。').not().isEmail().withMessage('有効なメールアドレスの形式で入力してください。'),
      check('subject').not().isEmpty().withMessage('件名は必須です。'),
      check('message').not().isEmpty().withMessage('メッセージは必須です。'),
      check('status').not().isIn([ 0 ]).withMessage('無効なステータス値です。'),
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
    app.post('/regist',contactValidationRules, async (req: any, res: any, next: any) => {
      // エラーを取得
      const errors = validationResult(req);
      // エラーが発生していたらエラー内容を取得
      if (!errors.isEmpty()) {
        throw new Error(errors.array().map(error => error.msg).join(', '));
      } else {
        // エラーが無ければデータの格納
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
    });

  } catch (e: any) {
    console.log(e.message);
  } finally {
    await prisma.$disconnect();
  }
}
