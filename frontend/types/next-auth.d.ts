import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's Id. */
      id: string
      isAdmin: boolean
      name: string
    }
  }
}
