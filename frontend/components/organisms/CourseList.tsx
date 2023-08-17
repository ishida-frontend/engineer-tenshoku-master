'use client'
import React from 'react'
import useSWR from 'swr'

import { CourseType } from '../../types'

export function CourseList() {
  const fetcher = async () =>
    (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all`)).json()

  const { data, error } = useSWR('courseList', fetcher)

  if (error) return <div>コースの取得に失敗しました。</div>
  if (!data) return <div>読み込み中……</div>

  return (
    <div>
      <h1>コース一覧</h1>
      {data.map((course: CourseType) => {
        return (
          <div key={course.id}>
            <p>コースID：{course.id}</p>
            <p>コース名：{course.name}</p>
            <p>概要：{course.description}</p>
            <p>作成日：{course.created_at}</p>
            <p>更新日：{course.updated_at}</p>
          </div>
        )
      })}
    </div>
  )
}
