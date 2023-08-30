'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { SectionManage } from '../../../../../components/admin/organisms/SectionManage'

export default function AdminSectionManage() {
  const params = useParams()
  console.log('params.course_id', params.course_id)
  return (
    <div>
      <p>{params.course_id}</p>
      <SectionManage course_id={params.course_id} />
    </div>
  )
}
