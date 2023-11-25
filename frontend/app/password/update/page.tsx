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
import AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`,
  ClientId: `${process.env.COGNITO_CLIENT_ID}`,
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

export default function Login() {
  const { showSuccessToast } = useCustomToast()
  const [formState, setFormState] = useState({
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

    try {
      if (!isSafePassword.test(formState.newPassword)) {
        setError(`以下の要件を満たしてください。
        ・大文字と小文字のアルファベットが必要です。
        ・0~9の数字が必要です
        ・文字数は8~24文字でないといけません。`)
        throw new Error('パスワードの更新に失敗しました。')
      } else {
        const userData = {
          Username: formState.currentPassword,
          Pool: userPool,
        }
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
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
        showSuccessToast('パスワードを更新しました。再度ログインしてください。')
      }
    } catch (err) {
      setError('パスワードの更新に失敗しました。')
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
