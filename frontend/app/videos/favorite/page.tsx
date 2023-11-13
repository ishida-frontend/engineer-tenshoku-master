import React from 'react'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { authOptions } from '../../api/auth/[...nextauth]/route'
import { FavoriteVideoList } from '../../../components/pages/FavoriteVideoList'
import { FavoriteVideoType } from '../../../types'
import { getUser } from '../../api'
import Error from '../../error'

export default async function FavoriteVideos() {
  const session: Session | null = await getServerSession(authOptions)
  const userId = await getUser(session?.user?.id)

  if (!userId) {
    redirect('/')
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/favoritevideo/${userId}`,
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
