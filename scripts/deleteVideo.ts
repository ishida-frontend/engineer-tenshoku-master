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

export async function deleteVideo(videoId: number) {
  await prisma.video.delete({ where: {id: videoId}});
}

export async function deleteVideos(videoId1:number, videoId2: number) {
  await prisma.video.deleteMany({
    where: {
      id: {
        in: [videoId1, videoId2],
      },
    },
  })
}

