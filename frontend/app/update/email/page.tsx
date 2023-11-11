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
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { PATHS } from '../../../constants/paths'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useCustomToast } from '../../../hooks/useCustomToast'

export default function Login() {
  const router = useRouter()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const [formState, setFormState] = useState({
    username: '',
    newEmail: '',
  })
  const [error, setError] = useState('')

  const handleLogout = async () => {
    await signOut({ callbackUrl: PATHS.LOGIN.path })
  }
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/update/email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formState.username,
            newEmail: formState.newEmail,
          }),
        },
      )
      console.log('response.ok:', response.ok)
      console.log('response.body:', response.body)

      if (!response.ok) {
        throw new Error('メールアドレスの更新に失敗しました。')
      }

      showSuccessToast('メールを送信しました。ご確認ください。')
    } catch (err) {
      console.error('Update email error:', err)
      setError('メールアドレスの更新に失敗しました。')
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
          メールアドレスの再設定
        </Heading>

        <VStack gap={'36px'}>
          <FormControl id="username" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>現在のメールアドレス</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="username"
              type="text"
              value={formState.username}
              placeholder="frontendengineer@gmail.com"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  username: e.target.value,
                })
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl id="newEmail" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>新しいメールアドレス</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="newEmail"
              type="newEmail"
              placeholder="newfrontendengineer@gmail.com"
              value={formState.newEmail}
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
        </VStack>

        {error && <Text color="red">{error}</Text>}
        <Button
          w={'100%'}
          mt={'42px'}
          mb={'24px'}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          メールアドレスを更新する
        </Button>

        <Box border={'1px solid #C400'} />

        <Box color={'teal'}>
          <Text onClick={handleLogout}>ログアウト</Text>
        </Box>
      </Container>
    </Center>
  )
}
