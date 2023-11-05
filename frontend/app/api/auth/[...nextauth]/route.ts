import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '../../auth'
import { getJwtDecoded } from '../../../../utils/jwtDecode'
import { getUser } from '../../user'
import { USER_ROLE } from '../../../../constants/user'
import { loggerInfo } from '../../../../utils/logger'
import { AuthOptions } from 'next-auth'

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
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const user = await getUser(token.sub || '')
      loggerInfo(`user: ${user}`, {
        caller: 'callbacks/session',
        status: 200,
      })
      return {
        ...session,
        user: {
          id: token.sub,
          name: user.name,
          isAdmin: user.role === USER_ROLE.ADMIN,
        },
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
