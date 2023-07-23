import axios from 'axios';
import { PrismaClient } from '@prisma/client'
import { readAllContacts } from '../scripts/readContact'
import { createContact } from '../scripts/createContact'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient();

exports.checkCreateContact = function(req: any, res: any){
  const errors = validationResult(req);
  // createContact()でデータ取得してから、バリデーションを実行しないとvalueが空になる(フロントが出来上がってから要対応)
  try {
    createContact();
    res.send('新しいお問い合わせが作成されました！');
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkReadContact = function(req: any, res: any){
  try {
    readAllContacts();
    res.send('お問合せを全件取得しました！')
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkSuccessContact = function(req: any, res: any){
  try {
    const id = req.query.id
    if (!id) {
      throw new Error('無効なコンタクトIDです。')
    }

    const contactData  = prisma.contact.findUnique({
      where: { id: Number(id) }
    });
    if (!contactData) {
      throw new Error('該当のIDが見つかりません。');
    }

    // type contactData = {[email: string]: any, subject: string, message: string};
    interface contactData {
      [email: string]: any,
      [subject: string]: any,
      [message: string]: any
    };
    const slackMessage: contactData = {
      text: `【テスト】新しいお問合せが届きました。
メールアドレス：${contactData.email}
件名：${contactData.subject}
本文：${contactData.message}`
    }

    const url: string = process.env.WEBHOOK_URL || 'default';
    const maxRetries = 3;
    for (let i =0; i < maxRetries; i++) {
      try {
        axios.post(url, slackMessage);
        break;
      } catch (error) {
        new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    res.status(200).send('お問合せを受け付けました。');
  } catch (e: any) {
    res.status(500).send('エラーが発生しました。');
  }
}