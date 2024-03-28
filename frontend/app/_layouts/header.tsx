'use client'
import { signOut } from 'next-auth/react'
import { HeaderLoggedIn } from '../../components/organisms/HeaderLoggedIn'
import { HeaderLoggedOut } from '../../components/organisms/HeaderLoggedOut'
import { PATHS } from '../../constants'

type HeaderProps = {
  user: {
    id: string
    isAdmin: boolean
    name: string
  }
}
export const Header = ({ user }: HeaderProps) => {
  const triggerSignOut = async () => {
    await signOut({ callbackUrl: PATHS.LOGIN.path })
  }
  return user ? (
    <HeaderLoggedIn user={user} signOut={triggerSignOut} />
  ) : (
    <HeaderLoggedOut />
  )
}
