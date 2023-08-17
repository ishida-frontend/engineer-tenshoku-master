import { useContext, useEffect, useState } from 'react'
import { checkToken } from '../app/api'
import { TokenContext } from '../providers/AuthProviders'

export const useAuth = () => {
  const { tokens } = useContext(TokenContext)
  //認証を許可するかどうかを状態管理
  const [check, setCheck] = useState<{
    checked: boolean
    isAuthenticated: boolean
  }>({ checked: false, isAuthenticated: false })
  //レンダリング後に実行
  useEffect(() => {
    const handleCheckToken = async () => {
      try {
        //バックエンドでtokenの検証および再作成
        const result: boolean = await checkToken(tokens.AccessToken)
        setCheck({
          checked: true,
          isAuthenticated: result,
        })
      } catch (error) {
        setCheck({ checked: true, isAuthenticated: false })
      }
    }
    handleCheckToken()
  }, [])

  return check
}
