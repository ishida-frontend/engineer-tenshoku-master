'use client'
import { Button, Link } from '@chakra-ui/react'

export function LoginButton() {
  return (
    <Link href="/auth/login">
      <Button
        w="144px"
        h="64px"
        fontSize="24px"
        bg="green.500"
        color="white"
        borderRadius="12px"
      >
        ログイン
      </Button>
    </Link>
  )
}

export function SignUpButton() {
  return (
    <Link href="/auth/register">
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
    </Link>
  )
}
