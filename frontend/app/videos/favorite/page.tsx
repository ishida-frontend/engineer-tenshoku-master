import React from 'react'

import { FavoriteVideoList } from '../../../components/pages/FavoriteVideoList'
import { FavoriteVideoType } from '../../../types'

export default async function FavoriteVideos() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/favoritevideo`,
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const favoriteVideos: FavoriteVideoType[] = await res.json()

  return <FavoriteVideoList favoriteVideos={favoriteVideos} />
}
