'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './AuthProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  )
}
