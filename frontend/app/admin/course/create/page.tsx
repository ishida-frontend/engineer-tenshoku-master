import Component from '../../../../components/admin/pages/CourseCreator'
export default async function CreateCoursePage() {
  try {
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`)

    const tagsRes = await fetch(`http://localhost:8000/tag`, {
      method: 'GET',
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
