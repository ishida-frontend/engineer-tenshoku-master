'use client'
import React from 'react'
import useSWR from 'swr'

import { TagType } from '../../../types/TagType'

export function CreateTag() {
  const fetcher = async () =>
    (await fetch('http://localhost:8000/tag/create')).json()

  const { data, error } = useSWR('CreateTag', fetcher)

  if (error) return <div>failed to load </div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      {data.map((tag: TagType) => {
        return (
          <div key={tag.id}>
            <p>タグID:{tag.id}</p>
            <p>タグ名:{tag.name}</p>
            <p>作成日:{tag.created_at}</p>
            <p>更新日:{tag.updated_at}</p>
          </div>
        )
      })}
    </div>
  )
}
