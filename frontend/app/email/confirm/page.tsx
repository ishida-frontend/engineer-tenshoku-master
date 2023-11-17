'use client'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCustomToast } from '../../../hooks/useCustomToast'

export default function EmailChangeConfirmPage() {
  const router = useRouter()
  const { showSuccessToast } = useCustomToast()
  const [codeState, setCodeState] = useState<string>()
  const [error, setError] = useState('')

  const handlePageBack = async () => {
    router.push('/email/update')
  }
  const handlePageLogin = async () => {
    router.push('/auth/login')
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/email/confirm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: codeState,
          }),
          mode: 'cors',
          credentials: 'include',
        },
      )
      console.log('response.ok:', response.ok)
      console.log('response.body:', response.body)

      if (!response.ok) {
        throw new Error('メールアドレスの認証に失敗しました。')
      }

      showSuccessToast(
        '新しいメールアドレスを認証しました。再度ログインしてください。',
      )
      router.push('/auth/login')
    } catch (error) {
      setError('メールアドレスの認証に失敗しました。')
    }
  }

  return (
    <Center padding="60px 96px" bg={'gray.200'}>
      <Container padding="60px 96px" bg={'white'} borderRadius={'4px'}>
        <Heading fontSize="2xl" mb="60px" textAlign="center" fontWeight="bold">
          認証コードを入力
        </Heading>

        <Box mb="28px">
          新しいメールアドレス宛に送信された認証コードを入力してください。
        </Box>

        <FormControl id="confirmCode" mb="42px" isRequired>
          <Input
            id="confirmCode"
            type="text"
            aria-required={true}
            border="1px"
            borderColor="gray.400"
            placeholder="000000"
            value={codeState}
            onChange={(e) => setCodeState(e.target.value)}
          />
        </FormControl>

        {error && <Text color="red">{error}</Text>}
        <Button w="100%" mb="42px" colorScheme="teal" onClick={handleSubmit}>
          認証する
        </Button>

        <Flex>
          <Box color={'teal'} cursor={'pointer'}>
            <Text onClick={handlePageBack}>前のページ</Text>
          </Box>
          <Spacer />
          <Box color={'teal'} cursor={'pointer'}>
            <Text onClick={handlePageLogin}>ログイン</Text>
          </Box>
        </Flex>
      </Container>
    </Center>
  )
}
