import React from 'react'
import { TagList } from '../../../components/admin/organisms/TagList'
import { TagType } from '../../../types/TagType'

export default async function AdminTag() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`, {
    cache: 'no-cache',
  })
  const tags: TagType[] = await res.json()

  return <TagList tags={tags} />
}
