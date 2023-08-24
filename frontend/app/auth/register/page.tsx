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
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCustomToast } from '../../../hooks/useCustomToast'

export default function Register() {
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isChecked) {
      showErrorToast('利用規約とプライバシーポリシーに同意してください')
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
          mt={'42px'}
          mb={'24px'}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          登録する
        </Button>
        <Box border={'1px solid'} borderColor={'#C400'} />
        <Box color={'teal'}>
          <Link href={'/auth/login'}>ログインはこちら</Link>
        </Box>{' '}
      </Container>
    </Center>
  )
}