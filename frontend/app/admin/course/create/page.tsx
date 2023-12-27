import Component from '../../../../components/admin/pages/CourseCreator'
export default async function CreateCoursePage() {
  const tagsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const tags = await tagsRes.json()

  return <Component tags={tags} />
}
