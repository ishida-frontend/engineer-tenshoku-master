import { PrismaClient } from '@prisma/client'
import { check, validationResult } from 'express-validator';

const prisma = new PrismaClient();

export async function createContact() {
  try {
    // 型宣言と実際のデータを設定
    type Contact = {name?: string, email: string, subject: string, message: string, status: number};
    const contactData: Contact = {
      name: undefined,
      email: "yamada0123@example.com",
      subject: "I like your videos.",
      message: "Thank you very much.",
      status: 0,
    };

    // エラーを取得
    const errors = validationResult(contactData);

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
    }

  } catch (e: any) {
    console.log(e.message);
  } finally {
    await prisma.$disconnect();
  }
}

