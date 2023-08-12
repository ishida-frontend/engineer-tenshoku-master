import express from 'express'
import { PrismaClient } from '@prisma/client'
import { check, validationResult } from 'express-validator'
import { ContactType } from '../types/index'
const prisma = new PrismaClient()

type createContactParamsType = {
  name: string
  email: string
  subject: string
  message: string
  status: number
}

export async function createContact(params: createContactParamsType) {
  try {
    const contactData: ContactType = {
      name: params.name,
      email: params.email,
      subject: params.subject,
      message: params.message,
      status: params.status,
    }

    const errors = validationResult(contactData)
    console.log('2errors', errors)

    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((error) => error.msg)
          .join(', '),
      )
    } else {
      const createdContact = await prisma.contact.create({
        data: {
          name: contactData.name ?? '',
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
          status: contactData.status,
        },
      })
    }
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
