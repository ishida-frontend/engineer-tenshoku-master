'use client'
import { Box } from '@chakra-ui/react'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { checkToken, getUser } from '../app/api'
import { getJwtDecoded } from '../utils/jwtDecode'
import { UserType } from '../types'

const initialUser = {
  id: '',
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
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>(initialUser)

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

      const resUser = await getUser(result.userId)

      setUser(resUser)
      // 認証が必要なところでは都度呼び出す
      // if (!result) {
      //   router.push('/auth/login')
      // } else {
      //   router.push('/')
      // }
    } catch (error) {
      setCheck({ checked: true, isAuthenticated: false })
    }
  }

  useEffect(() => {
    handleCheckToken()
  }, [])

  return (
    <Box>
      <AuthContext.Provider
        value={{
          check,
          handleCheckToken,
          user,
        }}
      >
        {children}
      </AuthContext.Provider>
    </Box>
  )
}
