// Prisma Client へアクセス
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Prisma はほとんどが非同期処理のため async/await を使う
async function courseCreate() {
  // 新規作成されたコースの情報を DB へ挿入
  const course = await prisma.course.create({
    data: {
      course_id: 1,
      name: "Course 1",
      description: "The very first course in the whole site.",
      published: true
    }
  })
  console.log(course);

  // // 全レコード削除
  // await prisma.course.deleteMany()
}

courseCreate()
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    // 処理終了後、DB との接続は自動切断されるが、保険として $disconnect()
    await prisma.$disconnect()
  })
