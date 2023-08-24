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
import React, { useContext, useState } from 'react'
import { TokenContext } from '../../../providers/AuthProviders'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const { tokens, setTokens } = useContext(TokenContext)
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formState)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        },
      )
      router.push('/')
    } catch (err) {
      console.log('err', err)
      throw new Error('エラーが発生しました')
    }
  }

  return (
    <Center minH={'100vh'} bg={'gray.200'}>
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
          mb={'24px'}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          ログイン
        </Button>

        <Box border={'1px solid #C400'} />

        {/* // TODO パスワードを忘れた場合       */}
        {/* <Text>パスワードを忘れた場合はこちら</Text> */}
        <Box color={'teal'}>
          <Link href={'/auth/register'}>新規登録はこちら</Link>
        </Box>
      </Container>
    </Center>
  )
}