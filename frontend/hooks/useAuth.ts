'use client'
import { useContext, useEffect, useState } from 'react'
import { checkToken } from '../app/api'
import { TokenContext } from '../providers/AuthProviders'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
  const { tokens } = useContext(TokenContext)
  //認証を許可するかどうかを状態管理
  const [check, setCheck] = useState<{
    checked: boolean
    isAuthenticated: boolean
  }>({ checked: false, isAuthenticated: false })
  useEffect(() => {
    const handleCheckToken = async () => {
      try {
        const result: boolean = await checkToken(tokens.AccessToken)
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
    handleCheckToken()
  }, [])

  return check
}
