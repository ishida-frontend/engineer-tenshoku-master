import Component from '../../../../components/admin/pages/CourseCreator'
export default async function CreateCoursePage() {
  const tagsRes = await fetch('http://localhost:8000/tag', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const tags = await tagsRes.json()

  return <Component tags={tags} />
}
