'use client'
import { HeaderLoggedIn } from '../components/organisms/HeaderLoggedIn'
import { HeaderLoggedOut } from '../components/organisms/HeaderLoggedOut'

export const Header = ({ isLogin }: { isLogin: boolean }) => {
  return isLogin ? <HeaderLoggedIn /> : <HeaderLoggedOut />
}
