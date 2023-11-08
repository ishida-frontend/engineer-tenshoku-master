import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

import Error from '../error'
import { getUser } from '../../app/api'
import { UserProfileWrapper } from '../../components/wrapper/pages/UserProfile'
import { Session } from 'next-auth'

export default async function UserProfilePage() {
  const session: Session | null = await getServerSession(authOptions)
  const user = await getUser(session?.user.id)

  try {
    return <UserProfileWrapper user={user} />
  } catch (e) {
    return <Error />
  }
}
