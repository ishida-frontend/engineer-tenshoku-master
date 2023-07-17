import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const prisma = new PrismaClient();

// データのバリデーションルールを定義
const contactValidationRules = [
  body('name').notEmpty().withMessage('名前は必須です。'),
  body('email').notEmpty().withMessage('メールアドレスは必須です。').isEmail().withMessage('有効なメールアドレスの形式で入力してください。'),
  body('subject').notEmpty().withMessage('件名は必須です。'),
  body('message').notEmpty().withMessage('メッセージは必須です。'),
  body('status').isInt({ min: 0, max: 2 }).withMessage('無効なステータス値です。'),
];

// 型宣言と実際のデータを設定
type Contact = {name: string, email: string, subject: string, message: string, status: number};
const contactData: Contact = {
  name: "yamada tarou",
  email: "yamadatarou@example.com",
  subject: "I like your videos.",
  message: "Thank you very much.",
  status: 0,
};

async function contactCreate(contactData) {
  // データの作成
  const contact = await prisma.contact.create({
    data: {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      status: contactData.status,
    }
  });

  // データのバリデーションを実行
  await Promise.all(contactValidationRules.map(validationRule => validationRule.run(contact)));

  // バリデーションエラーをチェック
  const errors = validationResult(contact);
  if (!errors.isEmpty()) {
    throw new Error(errors.array().map(error => error.msg).join(', '));
  }
  console.log(errors);
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
