import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  for (let i: number = 1; i <= 5; i++) {
    const post = await prisma.course.create({
      data: {
        id: crypto.randomUUID(),
        name: `Course ${i}`,
        description: `Description ${i}`,
        published: true,
        sections: {
          create: [
            {
              id: crypto.randomUUID(),
              title: `Section ${i}`,
              order: i,
              published: true,
              videos: {
                create: [
                  {
                    id: crypto.randomUUID(),
                    name: `Video ${i}`,
                    order: i,
                    url: `https://youtu.be/1SnOhALvS5c`,
                    description: `Description ${i}`,
                    published: true,
                  },
                ],
              },
            },
          ],
        },
      },
    })
    console.log({ post })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
