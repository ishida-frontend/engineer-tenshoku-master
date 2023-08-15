import express from 'express'
import { PrismaClient } from '@prisma/client'
import { ContactType } from '../types/index'
const prisma = new PrismaClient()

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
    const createdContact = await prisma.contact.create({
      data: {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        status: contactData.status,
      },
    })
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
