import { CourseEditor } from '../../../../../components/admin/pages/CourseEditor'

export default async function AdminEditCourse({
  params,
}: {
  params: { tagId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/tag/${params.tagId}`,
    {
      cache: 'no-cache',
    },
  )
  const courseData = await res.json()

  return <TagEditor tagId={params.tagId} courseData={courseData} />
}
