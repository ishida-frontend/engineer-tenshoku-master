import { PrismaClient } from '@prisma/client';
import { check, validationResult } from 'express-validator';

const prisma = new PrismaClient();

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
console.log('contactData',contactData);

async function contactCreate(contactData: Contact) {
  // データのバリデーションを実行
  const result = await Promise.all(contactValidationRules.map(validationRule => validationRule.run(contactData)));
  console.log("result", result);
  console.log("aaa");
  console.log('validate-Data',contactData);

  // バリデーションエラーをチェック
  const errors = validationResult(result);
  console.log("errors",errors);
  console.log("b");
  if (!errors.isEmpty()) {
    console.log("c");
    throw new Error(errors.array().map(error => error.msg).join(', '));
  } else {
    // データの作成
    const contact = await prisma.contact.create({
      data: {
        name: contactData.name ?? "",
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        status: contactData.status,
      }
    });
    console.log('contact',contact);
  }
}

contactCreate(contactData)
  .then((res) => {
    console.log(res);
  })
  .catch(e => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
