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
import React, { useEffect, useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { LuMail } from 'react-icons/lu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { AUTH } from '../../../constants'

export default function Login() {
  const { status: authStatus } = useSession()
  const router = useRouter()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    try {
      await signIn('credentials', {
        email: formState.email,
        password: formState.password,
        redirect: false,
        callbackUrl: '/',
      })
      router.push('/')
    } catch (err) {
      console.log('err', err)
      throw new Error('エラーが発生しました')
    }
  }

  useEffect(() => {
    // Google認証でログイン後のリダイレクト
    if (authStatus === AUTH.GOOGLE_AUTHENTICATED) {
      router.push('/')
    }
  }, [status])

  return (
    <Center padding="60px 96px" bg={'gray.200'}>
      <Container padding="60px 96px" bg={'white'}>
        <Heading
          fontSize={'2xl'}
          mb={'42px'}
          textAlign={'center'}
          fontWeight={'bold'}
        >
          ログイン
        </Heading>

        <VStack gap={'36px'}>
          <FormControl id="courseDescription" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>メールアドレス</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="email"
              type="text"
              value={formState.email}
              placeholder="frontendengineer@gmail.com"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  email: e.target.value,
                })
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl id="courseDescription" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>パスワード</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="password"
              type="password"
              placeholder="passwordを入力してください"
              value={formState.password}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value,
                })
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
        </VStack>

        <Button
          w={'100%'}
          mt={'42px'}
          mb={'12px'}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          <Box mr={'16px'}>
            <LuMail />
          </Box>
          メールアドレスでログイン
        </Button>

        <Box border={'1px solid #C400'} />

        {/* // TODO パスワードを忘れた場合       */}
        {/* <Text>パスワードを忘れた場合はこちら</Text> */}
        <Box color={'teal'} mb={'36px'}>
          <Link href={'/auth/register'}>新規登録はこちら</Link>
        </Box>

        <Button w={'100%'} colorScheme="blue" onClick={() => signIn('cognito')}>
          <Box mr={'16px'}>
            <BsGoogle />
          </Box>
          Googleアカウントでログイン
        </Button>
      </Container>
    </Center>
  )
}
