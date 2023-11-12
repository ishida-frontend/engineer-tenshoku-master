'use client'
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  Wrap,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { LuMail } from 'react-icons/lu'
import { useCustomToast } from '../../../hooks/useCustomToast'

export default function Register() {
  const { status } = useSession()
  const router = useRouter()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (!isChecked) {
      showErrorToast('利用規約とプライバシーポリシーに同意してください')
      return
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        },
      )
      const data = await res.json()

      if (data.success) {
        showSuccessToast(
          'メールアドレスに認証メールをお届けしました。そちらのリンクからログインしてください。',
        )
      }
    } catch (err) {
      throw new Error('エラーが発生しました')
    }
  }

  useEffect(() => {
    // Google認証でログイン後のリダイレクト
    if (status === 'authenticated') {
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
          新規登録
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

          <Container ml={'0px'} p={'0px'}>
            <HStack>
              <Checkbox
                colorScheme={'teal'}
                size={'lg'}
                onChange={() => setIsChecked(!isChecked)}
              />
              <Wrap>
                <Text>
                  <ChakraLink color="teal.500" href="#">
                    利用規約
                  </ChakraLink>
                  および
                  <ChakraLink color="teal.500" href="#">
                    プライバシーポリシー
                  </ChakraLink>
                  に同意する
                </Text>
              </Wrap>
            </HStack>
          </Container>
        </VStack>
        <Button
          w={'100%'}
          mt={'28px'}
          mb={'12px'}
          colorScheme="teal"
          pl={'26px'}
          onClick={handleSubmit}
        >
          <Box mr={'16px'}>
            <LuMail />
          </Box>
          メールアドレスで新規登録
        </Button>
        <Box border={'1px solid'} borderColor={'#C400'} />
        <Box color={'teal'} mb={'36px'}>
          <Link href={'/auth/login'}>ログインはこちら</Link>
        </Box>

        <Button
          w={'100%'}
          colorScheme="blue"
          pl={'26px'}
          onClick={() => signIn('cognito')}
        >
          <Box mr={'16px'}>
            <BsGoogle />
          </Box>
          Googleアカウントで新規登録
        </Button>
      </Container>
    </Center>
  )
}
