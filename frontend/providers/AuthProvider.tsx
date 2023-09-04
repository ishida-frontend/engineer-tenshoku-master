'use client'
import { Box } from '@chakra-ui/react'
import { ReactNode, createContext, useState } from 'react'

type TokenType = {
  AccessToken: string
  ExpiresIn: number
  IdToken: string
  RefreshToken: string
}

export const TokenContext = createContext({
  tokens: {
    AccessToken: '',
    ExpiresIn: 0,
    IdToken: '',
    RefreshToken: '',
  },
  setTokens: (tokens: TokenType) => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState({
    AccessToken: '',
    ExpiresIn: 0,
    IdToken: '',
    RefreshToken: '',
  })
  return (
    <Box>
      <TokenContext.Provider
        value={{
          tokens,
          setTokens,
        }}
      >
        {children}
      </TokenContext.Provider>
    </Box>
  )
}
