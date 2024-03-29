import axios from 'axios'
import prisma from '../utils/prismaClient'
import { ContactType } from '../types/index'

type createContactParamsType = {
  name: string
  email: string
  subject: string
  message: string
  status: number
}

export async function createContact(req: createContactParamsType) {
  try {
    const contactData: ContactType = {
      name: req.name,
      email: req.email,
      subject: req.subject,
      message: req.message,
      status: req.status,
    }
    await prisma.contact.create({
      data: {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        status: contactData.status,
      },
    })

    const slackMessage: { text: string } = {
      text: `【テスト】新しいお問合せが届きました。
      メールアドレス：${contactData.email}
      件名：${contactData.subject}
      本文：${contactData.message}`,
    }

    const url: string = process.env.WEBHOOK_URL || 'default'
    const maxRetries = 3
    for (let i = 0; i < maxRetries; i++) {
      try {
        await axios.post(url, slackMessage)
        break
      } catch (error) {
        new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }
  } catch (e) {
    throw new Error(`createContact error: ${e}`)
  } finally {
    await prisma.$disconnect()
  }
}
