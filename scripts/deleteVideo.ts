import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'Video') {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deleted_at: new Date() };
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date();
      } else {
        params.args.data = { deleted_at: new Date() };
      }
    }
  }

  return next(params);
})

async function testDeleteVideo(videoId: number) {
  await prisma.video.delete({ where: {id: videoId}});
  console.log(`ID${videoId}のビデオをソフトデリートしました。`);
}

async function testDeleteVideos(videoId1:number, videoId2: number) {
  await prisma.video.deleteMany({
    where: {
      id: {
        in: [videoId1, videoId2],
      },
    },
  })
  console.log(`ID${videoId1}と${videoId2}のビデオをソフトデリートしました。`);
}

testDeleteVideo(8)
testDeleteVideos(10, 11)
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

