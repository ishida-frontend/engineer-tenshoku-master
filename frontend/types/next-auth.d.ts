declare module 'next-auth' {
  interface Session {
    user: {
      idToken?: string
      refreshToken?: string
      accessToken?: string
      accessTokenExpires?: number
      id: string
      isAdmin: boolean
      name: string
      error?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string
    accessToken?: string
    accessTokenExpires?: number
    refreshToken?: string
    error?: string
  }
}
