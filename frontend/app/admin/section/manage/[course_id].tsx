'use client'
import React from 'react'
import { useRouter } from 'next/router'
import { SectionManage } from '../../../../components/admin/organisms/SectionManage'

export default function AdminSectionManage() {
  const router = useRouter()
  const { course_id } = router.query
  console.log('course_id', { course_id })
  return (
    <div>
      <p>{course_id}</p>
      <SectionManage course_path_id={course_id} />
    </div>
  )
}
