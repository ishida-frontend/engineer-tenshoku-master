import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '../../auth'
import { getJwtDecoded } from '../../../../utils/jwtDecode'
import { getUser } from '../../user'
import { USER_ROLE } from '../../../../constants/user'

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
      async authorize(credentials, req) {
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
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, ...other }) => {
      const user = await getUser(token.sub || '')
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isAdmin: user.role === USER_ROLE.ADMIN,
        },
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
