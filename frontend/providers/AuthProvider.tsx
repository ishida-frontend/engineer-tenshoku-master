'use client'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { checkToken, getUser } from '../app/api'
import { UserType } from '../types'
import { USER_ROLE } from '../constants/user'
import { useRouter } from 'next/navigation'
import { useCustomToast } from '../hooks/useCustomToast'

const initialUser = {
  id: '',
  role: USER_ROLE.USER,
  name: '',
  oneWord: '',
  goal: '',
  createdAt: '',
  updatedAt: '',
}
export const AuthContext = createContext({
  check: { checked: false, isAuthenticated: false },
  handleCheckToken: () => {},
  user: initialUser,
  isAdmin: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { showErrorToast } = useCustomToast()
  const [user, setUser] = useState<UserType>(initialUser)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [check, setCheck] = useState<{
    checked: boolean
    isAuthenticated: boolean
  }>({ checked: false, isAuthenticated: false })

  const handleCheckToken = async () => {
    try {
      const result: {
        check: boolean
        userId: string
      } = await checkToken()
      setCheck({
        checked: true,
        isAuthenticated: result.check,
      })

      const resUser: UserType = await getUser(result.userId)

      setUser(resUser)
      adminAuth(resUser.role === USER_ROLE.ADMIN)
    } catch (error) {
      setCheck({ checked: true, isAuthenticated: false })
      adminAuth(false)
    }
  }

  const adminAuth = (isAdmin: boolean) => {
    if (location.pathname.includes('admin') && !isAdmin) {
      router.push('/auth/login')
      showErrorToast('管理者権限でログインしてください。')
    }
  }

  useEffect(() => {
    handleCheckToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        check,
        handleCheckToken,
        user,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
