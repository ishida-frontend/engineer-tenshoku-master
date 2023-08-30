'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { SectionManage } from '../../../../../components/admin/organisms/SectionManage'
import { number } from 'zod'

export default function AdminSectionManage() {
  const params = useParams()
  console.log(
    'isNaN(Number(params.course_id)@page',
    isNaN(Number(params.course_id)),
  )
  console.log('params.course_id', params.course_id)
  const course_id: number = Number(params.course_id)
  return (
    <div>
      <p>{params.course_id}</p>
      <SectionManage course_id={Number(params.course_id)} />
    </div>
  )
}
