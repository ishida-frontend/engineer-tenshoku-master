'use client'
import { Button } from '@chakra-ui/react'

export function LoginButton() {
  return (
    <Button
      w="144px"
      h="64px"
      fontSize="24px"
      colorScheme="green"
      borderRadius="12px"
    >
      ログイン
    </Button>
  )
}

export function SignUpButton() {
  return (
    <Button
      w="144px"
      h="64px"
      fontSize="24px"
      bg="white"
      border="1px"
      borderColor="blackAlpha.400"
      borderRadius="12px"
    >
      新規登録
    </Button>
  )
}
