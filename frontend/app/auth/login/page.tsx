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
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { HeaderLoggedIn } from '../../../components/organisms/HeaderLoggedIn'
import { HeaderLoggedOut } from '../../../components/organisms/HeaderLoggedOut'
import { Footer } from '../../../components/organisms/Footer'

export default function Login() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    console.log(formState)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      router.push('/')
    } catch (err) {
      console.log('err', err)
      throw new Error('エラーが発生しました')
    }
  }

  return (
    <Box minH={'100vh'} bg={'gray.200'}>
      <HeaderLoggedIn />
      <Box mt={'60px'}>
        <Container padding="60px 96px" bg={'white'} minH={'700px'}>
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
          <Box
            h={'82px'}
            mt={'127px'}
            color={'teal'}
            borderTop={'1px solid #0000003d'}
          >
            <Container pl={'0px'} pt={'65px'}>
              <Link href={'/auth/register'}>新規登録はこちら</Link>
            </Container>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}
