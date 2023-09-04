'use client'
import { HeaderLoggedIn } from '../components/organisms/HeaderLoggedIn'
import { HeaderLoggedOut } from '../components/organisms/HeaderLoggedOut'
import { useAuth } from '../hooks/useAuth'

export const Header = () => {
  const check = useAuth()

  return check.isAuthenticated ? <HeaderLoggedIn /> : <HeaderLoggedOut />
}
