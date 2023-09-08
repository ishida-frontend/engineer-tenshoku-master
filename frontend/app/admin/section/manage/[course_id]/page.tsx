import React from 'react'
import { SectionManage } from '../../../../../components/admin/organisms/SectionManage'

export default async function AdminSectionManage({
  params,
}: {
  params: { course_id: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/read/${params.course_id}`,
    {
      cache: 'no-cache',
    },
  )
  const sections = await res.json()
  return (
    <SectionManage course_id={params.course_id} initialSections={sections} />
  )
}
