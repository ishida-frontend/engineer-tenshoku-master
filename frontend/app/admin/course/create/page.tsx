'use client'
import Component from '../../../../components/admin/pages/CourseCreator'
export default async function CreateCoursePage() {
  try {
    const tagsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const tags = await tagsRes.json()

    return <Component tags={tags} />
  } catch (error) {
    throw new Error('タグの取得に失敗しました。')
  }
}
