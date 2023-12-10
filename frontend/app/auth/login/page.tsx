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
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'

export type FormStateType = {
  email: string
  password: string
}
type LoginResponse = {
  token: string
  // 他の必要なフィールドを追加
}
export default function Login() {
  const { status: authStatus } = useSession()
  const router = useRouter()
  const [formState, setFormState] = useState<FormStateType>({
    email: '',
    password: '',
  })

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    try {
      const login = (formState: FormStateType): Promise<LoginResponse> => {
        console.log('formState:', formState)
        return new Promise((resolve, reject) => {
          const authenticationData = {
            Username: formState.email,
            Password: formState.password,
          }
          const authenticationDetails =
            new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)

          const poolData = {
            UserPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
            ClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
          }
          const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

          const userData = {
            Username: formState.email,
            Pool: userPool,
          }
          const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
              result.getAccessToken().getJwtToken()

              AWS.config.region = `${process.env.NEXT_PUBLIC_REGION}`
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
                Logins: {
                  [`cognito-idp.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`]:
                    result.getIdToken().getJwtToken(),
                },
              })

              if (AWS.config.credentials instanceof AWS.Credentials) {
                AWS.config.credentials.refresh((error) => {
                  if (error) {
                    error
                  }
                })
              }
              const token = result.getIdToken().getJwtToken()
              console.log('token:', token)
              const loginResponse: LoginResponse = {
                token: token,
                // 他の必要なフィールドがあればここに追加
              }
              resolve(loginResponse)
              router.push('/')
            },

            onFailure: async function (err) {
              reject(err)
              await JSON.stringify(err)
              alert(err.message || JSON.stringify(err))
            },
          })
        })
      }
      return login(formState)
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
