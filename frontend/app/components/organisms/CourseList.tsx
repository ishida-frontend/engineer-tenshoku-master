'use client'
import React from 'react';
import useSWR from 'swr'

type CourseType = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export function CourseList() {
  const fetcher = async () =>
  (await fetch('http://localhost:8000/course/all')).json()

  const { data, error } = useSWR('courseList', fetcher);

  if (error) return <div>コースの取得に失敗しました。</div>
  if (!data) return <div>読み込み中……</div>

  return (
    <div>
      <p>コース一覧</p>
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
