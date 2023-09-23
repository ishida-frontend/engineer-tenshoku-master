'use client'
import { Box } from '@chakra-ui/react'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { checkToken } from '../app/api'

export const AuthContext = createContext({
  check: { checked: false, isAuthenticated: false },
  handleCheckToken: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  //認証を許可するかどうかを状態管理
  const [check, setCheck] = useState<{
    checked: boolean
    isAuthenticated: boolean
  }>({ checked: false, isAuthenticated: false })

  const handleCheckToken = async () => {
    try {
      const result: boolean = await checkToken()
      console.log('result', result)

      setCheck({
        checked: true,
        isAuthenticated: result,
      })
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
        }}
      >
        {children}
      </AuthContext.Provider>
    </Box>
  )
}
