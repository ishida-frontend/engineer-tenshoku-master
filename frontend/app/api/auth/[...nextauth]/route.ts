import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token, ...other }) => {
      const user = await getUser(token.sub || '')

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
    signIn: async ({ profile }) => {
      try {
        const { sub: id, name } = profile
        let existingUser = await getUser(id)

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
              }),
            },
          )
        }

        return true
      } catch (err) {
        throw new Error('エラーが発生しました')
      }
    },
  },
  secret: process.env.JWT_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
