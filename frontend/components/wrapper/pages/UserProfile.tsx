'use client'
import React, { useEffect, useState } from 'react'
import { UserType } from 'frontend/types'
import { UserProfile } from 'frontend/components/pages/UserProfile'
import Error from '../../../app/error'

export function UserProfileWrapper({ user }: { user: UserType }) {
  try {
    return <UserProfile user={user} />
  } catch (e) {
    return <Error />
  }
}
