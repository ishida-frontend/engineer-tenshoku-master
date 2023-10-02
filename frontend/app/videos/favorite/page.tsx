import React from 'react'

import { FavoriteVideoList } from 'components/organisms/FavoriteVideoList'
import { VideoFavoriteType } from 'types'
import Error from 'app/error'
export default async function FavoriteVideo() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/video/favorite/all`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const favorites: FavoriteVideoType[] = await res.json()

    return <FavoriteVideoList favorites={favorites} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
