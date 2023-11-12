import React from 'react'

import { APIS } from '../../../constants'
import { TagList } from '../../../components/admin/organisms/TagList'
import { TagType } from '../../../types/TagType'

export default async function AdminTag() {
  const res = await fetch(APIS.ADMIN.COURSE.TAG.GET.path(), {
    method: 'GET',
    cache: 'no-cache',
  })
  const tags: TagType[] = await res.json()

  return <TagList tags={tags} />
}
