import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (let i: number = 1; i <= 5; i++) {
    const post = await prisma.course.create({
      data: {
        name: `Course ${i}`,
        description: `Description ${i}`,
        published: true,
        sections: {
          create: [
            {
              title: `Section ${i}`,
              order: i,
              published: true,
              videos: {
                create: [
                  {
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
