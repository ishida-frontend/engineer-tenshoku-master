'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { NextAuthProvider } from './NextAuthProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ChakraProvider>
  )
}
