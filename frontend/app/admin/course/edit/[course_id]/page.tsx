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
  const courseData = await res.json()

  return <CourseEditor course_id={params.course_id} courseData={courseData} />
}
