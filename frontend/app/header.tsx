'use client'
import { HeaderLoggedIn } from '../components/organisms/HeaderLoggedIn'
import { HeaderLoggedOut } from '../components/organisms/HeaderLoggedOut'
type HeaderProps = {
  user: {
    id: string
    isAdmin: boolean
    name: string
  }
  signOut: () => Promise<void>
}
export const Header = ({ user, signOut }: HeaderProps) => {
  return user ? (
    <HeaderLoggedIn user={user} signOut={signOut} />
  ) : (
    <HeaderLoggedOut />
  )
}
