import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

import Error from '../error'
import { getUser } from '../../app/api'
import { UserProfileWrapper } from 'frontend/components/wrapper/pages/UserProfile'

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions)
  const user = await getUser(session?.user.id)

  try {
    return <UserProfileWrapper user={user} />
  } catch (e) {
    return <Error />
  }
}
