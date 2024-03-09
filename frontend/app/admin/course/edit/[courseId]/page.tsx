import { CourseEditor } from '../../../../../components/admin/pages/CourseEditor'

export default async function AdminEditCourse({
  params,
}: {
  params: { courseId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${params.courseId}`,
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
      courseId={params.courseId}
      courseData={courseData}
      tags={tags}
    />
  )
}
