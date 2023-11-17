'use client'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  //ここからした
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCustomToast } from '../../../hooks/useCustomToast'

export default function Login() {
  const router = useRouter()
  const { showSuccessToast } = useCustomToast()
  const [formState, setFormState] = useState({
    newEmail: '',
    code: '',
  })
  const [error, setError] = useState('')

  const handlePageBack = async () => {
    router.push('/email/update')
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
            newEmail: formState.newEmail,
            code: formState.code,
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
      router.push('/course')
    } catch (error) {
      setError('メールアドレスの認証に失敗しました。')
    }
  }

  return (
    <Center padding="60px 96px" bg={'gray.200'}>
      <Container padding="60px 96px" bg={'white'}>
        <Heading
          fontSize={'2xl'}
          mb={'42px'}
          textAlign={'center'}
          fontWeight={'bold'}
        >
          新しいメールアドレスの認証
        </Heading>

        <VStack gap={'36px'}>
          <FormControl id="newEmail" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>新しいメールアドレス</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="newEmail"
              type="text"
              value={formState.newEmail}
              placeholder="newfrontendengineer@gmail.com"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  newEmail: e.target.value,
                })
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl id="code" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>コード</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="code"
              type="code"
              placeholder="000000"
              value={formState.code}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  code: e.target.value,
                })
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
        </VStack>

        {error && <Text color="red">{error}</Text>}
        <Button
          w={'100%'}
          mt={'42px'}
          mb={'24px'}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          メールアドレスを認証する
        </Button>

        <Box border={'1px solid #C400'} />

        <Box color={'teal'}>
          <Text onClick={handlePageBack}>前の画面へ戻る</Text>

          //ここからした
          </Box>
  FormControl,
  Heading,
  Input,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function EmailChangeConfirmPage() {
  return (
    <Center padding="60px 96px" bg={'gray.200'}>
      <Container padding="60px 96px" bg={'white'}>
        <Heading fontSize="2xl" mb="60px" textAlign="center" fontWeight="bold">
          認証コードを入力
        </Heading>

        <Box mb="28px">
          新しいメールアドレス宛に送信した認証コードを入力してください。
        </Box>

        <FormControl id="verificationCode" mb="42px" isRequired>
          <Input
            id="verificationCode"
            type="text"
            aria-required={true}
            border="1px"
            borderColor="gray.400"
            placeholder="認証コード"
          />
        </FormControl>

        <Button w="100%" mb="42px" colorScheme="teal">
          認証する
        </Button>

        <Box color="teal">
          <Link as={NextLink} href="/auth/login">
            ログイン
          </Link>
        </Box>
      </Container>
    </Center>
  )
}
