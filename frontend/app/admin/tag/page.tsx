import React from 'react'
import { TagList } from '../../../components/admin/organisms/TagList'
import { TagType } from '../../../types/TagType'
import Error from '../../error'

export default async function AdminTag() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`, {
      cache: 'no-cache',
    })
    const tags: TagType[] = await res.json()

    return <TagList tags={tags} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
