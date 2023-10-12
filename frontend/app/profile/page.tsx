import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

import { UserProfile } from '../../components/pages/UserProfile'
import Error from '../error'
import { getUser } from 'app/api'

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const userData = await getUser(userId)

  try {
    return <UserProfile userData={userData} />
  } catch (e) {
    return <Error />
  }
}
