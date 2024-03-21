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
  FormErrorMessage,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { LuMail } from 'react-icons/lu'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { AUTH } from '../../../constants/auth'
import { ZodIssue } from 'zod'
import { registerSchema } from '../../../zod'

export default function Register() {
  const { status: authStatus } = useSession()
  const router = useRouter()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, SetIsSubmitting] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [errors, setErrors] = useState<ZodIssue[]>([])

  const toast = useToast()

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      event.preventDefault()
      if (!isChecked) {
        showErrorToast('利用規約とプライバシーポリシーに同意してください')
        return
      }

      const registerValidationResult = registerSchema.safeParse(formState)
      if (registerValidationResult.success === false) {
        setErrors(registerValidationResult.error.issues)
        toast({
          title: 'フォームの入力に誤りがあります',
          status: 'error',
          position: 'top',
          duration: 3000,
        })
        return
      }
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
    } catch (e) {
      toast({
        title: '新規登録に失敗しました',
        status: 'error',
        position: 'top',
        duration: 3000,
      })
    } finally {
      SetIsSubmitting(false)
    }
  }

  useEffect(() => {
    // Google認証でログイン後のリダイレクト
    if (authStatus === AUTH.GOOGLE_AUTHENTICATED) {
      router.push('/')
    }
  }, [authStatus])

  return (
    <Center padding="60px 96px">
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
          <FormControl
            id="courseDescription"
            isRequired
            isInvalid={
              !!errors &&
              errors.find &&
              !!errors.find((e) => {
                return e.path[0] === 'email'
              })
            }
          >
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
            <FormErrorMessage>
              {errors &&
                errors.find &&
                errors.find((e) => {
                  return e.path[0] === 'email'
                })?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="courseDescription"
            isRequired
            isInvalid={
              !!errors &&
              errors.find &&
              !!errors.find((e) => {
                return e.path[0] === 'password'
              })
            }
          >
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
            <FormErrorMessage>
              {errors &&
                errors.find &&
                errors.find((e) => {
                  return e.path[0] === 'password'
                })?.message}
            </FormErrorMessage>
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
          isLoading={isSubmitting}
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
