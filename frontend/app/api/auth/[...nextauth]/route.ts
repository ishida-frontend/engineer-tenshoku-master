import NextAuth, { AuthOptions } from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '../../auth'
import { getJwtDecoded } from '../../../../utils/jwtDecode'
import { getUser } from '../../user'
import { USER_ROLE } from '../../../../constants/user'
import { loggerInfo } from '../../../../utils/logger'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (typeof credentials !== 'undefined') {
            const res: {
              AccessToken: string
              IdToken: string
              RefreshToken: string
            } = await login({
              email: credentials.email,
              password: credentials.password,
            })
            const user = await getUser(getJwtDecoded(res.IdToken).sub)

            if (typeof res !== 'undefined') {
              loggerInfo(`typeof res !== 'undefined'`, {
                caller: 'authorize',
                status: 400,
              })
              return user
            } else {
              loggerInfo(`else user: ${user}`, {
                caller: 'authorize',
                status: 400,
              })
              return null
            }
          } else {
            loggerInfo(`typeof credentials === 'undefined':`, {
              caller: 'authorize',
              status: 400,
            })
            return null
          }
        } catch (e) {
          loggerInfo(`error: ${e}`, {
            caller: 'authorize',
            status: 400,
          })
          return null
        }
      },
    }),
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
      checks: 'nonce',
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const user = await getUser(token.sub || '')
      loggerInfo(`user: ${user}`, {
        caller: 'callbacks/session',
        status: 200,
      })

      if (user) {
        return {
          ...session,
          user: {
            id: token.sub,
            name: user.name,
            isAdmin: user.role === USER_ROLE.ADMIN,
          },
        }
      } else {
        return session
      }
    },
    signIn: async ({ account, profile }) => {
      if (account.provider === 'cognito') {
        try {
          const { sub: id, name, image } = profile
          const existingUser = await getUser(id)

          if (!existingUser) {
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google-signup`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id,
                  name,
                  image,
                }),
              },
            )
          }
          return true
        } catch (err) {
          throw new Error('Error: siginIn error')
        }
      }
      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
