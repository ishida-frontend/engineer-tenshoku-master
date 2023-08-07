import { PrismaClient } from '@prisma/client'
import { check, validationResult } from 'express-validator'
import { ContactType } from '../types/index'
import useSWR, { mutate } from 'swr'
const prisma = new PrismaClient()

export async function createContact() {
  try {
    const fetcher = async () =>
      (await fetch('http://localhost:8080/contact/create')).json()

    const { data, error } = useSWR('contactList', fetcher)
    console.log('data', data)
    console.log('error', error)
    // const contactData: ContactType = {
    //   name: 'Tarou Yamada',
    //   email: 'yamada0123@example.com',
    //   subject: 'I like your videos.',
    //   message: 'Thank you very much.',
    //   status: 0,
    // }

    // const errors = validationResult(contactData)

    // if (!errors.isEmpty()) {
    //   throw new Error(
    //     errors
    //       .array()
    //       .map((error) => error.msg)
    //       .join(', '),
    //   )
    // } else {
    //   const createdContact = await prisma.contact.create({
    //     data: {
    //       name: contactData.name ?? '',
    //       email: contactData.email,
    //       subject: contactData.subject,
    //       message: contactData.message,
    //       status: contactData.status,
    //     },
    //   })
    // }
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
