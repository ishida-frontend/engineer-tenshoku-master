import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/route'

import { FavoriteVideoList } from 'components/pages/FavoriteVideoList'
import { FavoriteVideoType } from 'types'
import { getUser } from 'app/api'
import Error from 'app/error'

export default async function FavoriteVideos() {
  try {
    const session = await getServerSession(authOptions)
    const user = await getUser(session?.user.id)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/favoritevideo/${user.id}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const favoriteVideos: FavoriteVideoType[] = await res.json()

    return <FavoriteVideoList favoriteVideos={favoriteVideos} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
