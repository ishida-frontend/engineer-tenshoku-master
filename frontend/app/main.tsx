import { Loader } from '../components/atoms/Loader'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'
// import { PATHS } from '../constants/paths'
// import { useSession, signOut } from 'next-auth/react'
import { Box, Flex } from '@chakra-ui/react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'
import { useEffect, useState } from 'react'

export type UserSessionType = {
  id: string
  isAdmin: boolean
  name: string
}

export const Main = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSessionType>(null)
  const [isLoading, setIsLoading] = useState(true)
  const poolData = {
    UserPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
    ClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
  }
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  const cognitoUser = userPool.getCurrentUser()

  const adminGetUser = async () => {
    try {
      if (cognitoUser != null) {
        const result = await new Promise<CognitoUserSession>(
          (resolve, reject) => {
            cognitoUser.getSession((error, session) => {
              if (error) reject(error)
              else resolve(session)
            })
          },
        )

        AWS.config.region = `${process.env.NEXT_PUBLIC_REGION}`

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
          Logins: {
            [`cognito-idp.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`]:
              result.getIdToken().getJwtToken(),
          },
        })

        await new Promise<void>((resolve, reject) => {
          if (AWS.config.credentials instanceof AWS.Credentials) {
            AWS.config.credentials.refresh((error) => {
              if (error) reject(error)
              else resolve()
            })
          } else {
            resolve()
          }
        })

        // ここでユーザーデータを返す
        return user
      } else {
        throw new Error('No current user')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    adminGetUser()
      .then((userData) => {
        setUser(userData)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error in adminGetUser:', error)
      })
  }, [])

  if (isLoading) {
    return <Loader />
  }

  // const user = adminGetUser?.user as {
  //   id: string
  //   isAdmin: boolean
  //   name: string
  // }

  const triggerSignOut = async () => cognitoUser.signOut()
  console.log('user:', user)

  return (
    <Flex direction="column" minH="100vh">
      <Header user={user} signOut={triggerSignOut} />
      <Box flex="1" bg="gray.200">
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}
