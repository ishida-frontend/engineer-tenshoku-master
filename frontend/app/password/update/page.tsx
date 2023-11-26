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
import { signOut } from 'next-auth/react'
import { useCustomToast } from '../../../hooks/useCustomToast'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'

export default function Login() {
  const { showSuccessToast } = useCustomToast()
  const [formState, setFormState] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
  })
  const [error, setError] = useState('')
  const minPasswordLength = 8
  const maxPasswordLength = 24
  const isSafePassword = new RegExp(
    `^(?=.*[A-Z])(?=.*[a-z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{${minPasswordLength},${maxPasswordLength}}$`,
  )

  const handleLogout = async () => {
    await signOut({ callbackUrl: PATHS.LOGIN.path })
  }
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setError('')
    console.log('aaaaa:')

    console.log(
      'isSafePassword.test(formState.newPassword):',
      isSafePassword.test(formState.newPassword),
    )
    console.log('formState:', formState)

    if (isSafePassword.test(formState.newPassword)) {
      try {
        console.log('trueの処理:')
        const authenticationPasswordResetData = {
          Username: formState.email,
          Password: formState.currentPassword,
        }
        // const authenticationDetails =
        //   new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
        console.log(
          'authenticationPasswordResetData',
          authenticationPasswordResetData,
        )

        const poolData = {
          UserPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
          ClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
        }
        console.log('poolData:', poolData)
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
        console.log('userPool:', userPool)

        const userData = {
          Username: formState.email,
          Pool: userPool,
        }
        console.log('userData:', userData)
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
        console.log('cognitoUser:', cognitoUser)
        // 認証開始
        const authenticationDetails =
          new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationPasswordResetData,
          )
        console.log('authenticationDetails', authenticationDetails)

        // セッション取得開始
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            console.log('onSuccess:', result)
            const accessToken = result.getAccessToken().getJwtToken()
            console.log('accessToken:', accessToken)

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
                  console.error(error)
                } else {
                  console.log('Successfully logged!')
                }
              })
            }

            // パスワード更新
            cognitoUser.changePassword(
              formState.currentPassword,
              formState.newPassword,
              function (err, result) {
                if (err) {
                  alert(err.message || JSON.stringify(err))
                  return
                }
                console.log('call result: ' + result)
              },
            )
            showSuccessToast(
              'パスワードを更新しました。再度ログインしてください。',
            )
          },

          onFailure: async function (err) {
            const res = await JSON.stringify(err)
            console.log('res', res)

            console.log('onFailure:', err)
            alert(err.message || JSON.stringify(err))
          },
          newPasswordRequired: function (userAttributes) {
            console.log('newPasswordRequired:', userAttributes)
            cognitoUser.completeNewPasswordChallenge(
              formState.newPassword,
              {},
              {
                onSuccess: function (result) {
                  console.log('onSuccess:', result)
                },
                onFailure: function (err) {
                  console.log('onFailure:', err)
                },
              },
            )
          },
        })
      } catch (err) {
        setError('パスワードの更新に失敗しました。')
      }
    } else {
      console.log('falseの処理:')
      setError(`以下の要件を満たしてください。
        ・大文字と小文字のアルファベットが必要です。
        ・0~9の数字が必要です。
        ・文字数は${minPasswordLength}~${maxPasswordLength}文字でないといけません。`)
      // throw new Error('パスワードの更新に失敗しました。')
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
          パスワードの再設定
        </Heading>

        <VStack gap={'36px'}>
          <FormControl id="email" isRequired>
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
          <FormControl id="currentPassword" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>現在のパスワード</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="currentPassword"
              type="text"
              value={formState.currentPassword}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  currentPassword: e.target.value,
                })
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl id="newPassword" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>新しいパスワード</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="newPassword"
              type="text"
              value={formState.newPassword}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  newPassword: e.target.value,
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
          パスワードを更新する
        </Button>

        <Box border={'1px solid #C400'} />

        <Box color={'teal'}>
          <Text onClick={handleLogout}>ログアウト</Text>
        </Box>
      </Container>
    </Center>
  )
}
