import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { THEME_COLOR } from '../../constants'
const prisma = new PrismaClient()

async function main() {
  for (let i: number = 1; i <= 5; i++) {
    const videos = [];
    for (let j = 1; j <= 3; j++) {
      videos.push({
        id: crypto.randomUUID(),
        name: `Video ${j} for Course ${i}`,
        order: j,
        url: `https://www.youtube.com/embed/1SnOhALvS5c`, // Sample URL
        description: `Description ${j} for Course ${i}`,
        published: true,
      });
    }
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
                    url: `https://www.youtube.com/embed/1SnOhALvS5c`,
                    description: `Description ${i}`,
                    published: true,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: `Video ${i}`,
                    order: i,
                    url: `https://www.youtube.com/embed/1SnOhALvS5c`,
                    description: `Description ${i}`,
                    published: true,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: `Video ${i}`,
                    order: i,
                    url: `https://www.youtube.com/embed/1SnOhALvS5c`,
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

  await prisma.tag.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        name: 'React',
        color: THEME_COLOR.BASIC_BLACK,
        backgroundColor: '#61dafb',
      },
      {
        id: crypto.randomUUID(),
        name: 'JavaScript',
        color: THEME_COLOR.BASIC_BLACK,
        backgroundColor: '#f0db4f',
      },
      {
        id: crypto.randomUUID(),
        name: 'TypeScript',
        color: THEME_COLOR.BASIC_WHITE,
        backgroundColor: '#007acc',
      },
      {
        id: crypto.randomUUID(),
        name: 'Node.js',
        color: THEME_COLOR.BASIC_WHITE,
        backgroundColor: '#68a063',
      },
      {
        id: crypto.randomUUID(),
        name: 'Express',
        color: THEME_COLOR.BASIC_WHITE,
        backgroundColor: '#000000',
      },
      {
        id: crypto.randomUUID(),
        name: 'GraphQL',
        color: THEME_COLOR.BASIC_WHITE,
        backgroundColor: '#e535ab',
      },
      {
        id: crypto.randomUUID(),
        name: 'Next.js',
        color: THEME_COLOR.BASIC_WHITE,
        backgroundColor: '#000000',
      },
      {
        id: crypto.randomUUID(),
        name: 'Docker',
        color: THEME_COLOR.BASIC_WHITE,
        backgroundColor: '#2496ed',
      },
      {
        id: crypto.randomUUID(),
        name: 'MySQL',
        color: THEME_COLOR.BASIC_BLACK,
        backgroundColor: '#4479a1',
      },
      {
        id: crypto.randomUUID(),
        name: 'Git',
        color: THEME_COLOR.BASIC_WHITE,
        backgroundColor: '#f34f29',
      },
      {
        id: crypto.randomUUID(),
        name: 'VSCode',
        color: THEME_COLOR.BASIC_BLACK,
        backgroundColor: '#007acc',
      },
    ],
  })
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
