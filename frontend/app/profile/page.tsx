import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

import { UserProfile } from '../../components/pages/UserProfile'
import Error from '../error'
import { getUser } from '../../app/api'

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions)
  const user = await getUser(session?.user.id)

  try {
    return <UserProfile user={user} />
  } catch (e) {
    return <Error />
  }
}
