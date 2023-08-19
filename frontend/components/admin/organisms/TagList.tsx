'use client'
import React from 'react'
import useSWR from 'swr'

type TagType = {
  id: number
  name: string
  created_ad: string
  updated_at: string
}

export function TagList(){
  const fetcher = async () =>
  (await fetch('http://localhost:8000/tag/all')).json()

const { data, error } = useSWR('TagList', fetcher)

if (error) return <div>failed to load</div>
if (!data) return <div>loading...</div>

return (
  <div>
    <h1>タグ一覧</h1>
    {data.map((tag: TagType) =>{
      return (
        <div key={tag.id}>
          <p>ID:{tag.id}</p>
          <p>名:{tag.name}</p>
          <p>作成日:{tag.created_ad}</p>
          <p>更新日:{tag.updated_at}</p>
        </div>
      )
    })}
  </div>
)
  }
