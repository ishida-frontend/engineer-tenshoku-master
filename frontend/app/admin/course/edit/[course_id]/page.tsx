import { CourseEditor } from '../../../../../components/admin/organisms/CourseEditor'

export default async function AdminEditCourse({
  params,
}: {
  params: { course_id: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${params.course_id}`,
    {
      cache: 'no-cache',
    },
  )
  const tagsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`, {
    cache: 'no-cache',
  })
  const [courseData, tags] = await Promise.all([res.json(), tagsRes.json()])

  return (
    <CourseEditor
      course_id={params.course_id}
      courseData={courseData}
      tags={tags}
    />
  )
}
