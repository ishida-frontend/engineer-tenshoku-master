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
    currentEmail: '',
    password: '',
    newEmail: '',
  })
  const [error, setError] = useState('')
  const isSafeEmail = new RegExp(
    `^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$`,
  )

  const handleLogout = async () => {
    await signOut({ callbackUrl: PATHS.LOGIN.path })
  }
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setError('')

    if (isSafeEmail.test(formState.newEmail)) {
      try {
        const authenticationEmailResetData = {
          Username: formState.currentEmail,
          Password: formState.password,
        }

        const poolData = {
          UserPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
          ClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
        }
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

        const userData = {
          Username: formState.currentEmail,
          Pool: userPool,
        }
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
        const authenticationDetails =
          new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationEmailResetData,
          )

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

            const attributeList = []
            const attributeData = {
              Name: 'email',
              Value: formState.newEmail,
            }
            const attribute = new AmazonCognitoIdentity.CognitoUserAttribute(
              attributeData,
            )
            attributeList.push(attribute)

            cognitoUser.updateAttributes(attributeList, function (err, result) {
              if (err) {
                alert(err.message || JSON.stringify(err))
                return
              }
              result
            })
            cognitoUser.getAttributeVerificationCode('email', {
              onSuccess: function (result) {
                result
              },
              onFailure: function (err) {
                alert(err.message || JSON.stringify(err))
              },
              inputVerificationCode: function () {
                const verificationCode = prompt(
                  '新しいメールアドレスに届いた認証コードを入力してください: ',
                  '',
                )
                cognitoUser.verifyAttribute('email', verificationCode, this)
              },
            })
            showSuccessToast(
              '新しいメールアドレスへ認証コードを送りました。認証してログインしてください。',
            )
          },

          onFailure: async function (err) {
            await JSON.stringify(err)
            alert(err.message || JSON.stringify(err))
          },
        })
      } catch (err) {
        setError('メールアドレスの更新に失敗しました。')
      }
    } else {
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
          パスワードの再設定
        </Heading>

        <VStack gap={'36px'}>
          <FormControl id="currentEmail" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>現在のメールアドレス</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="currentEmail"
              type="text"
              value={formState.currentEmail}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  currentEmail: e.target.value,
                })
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>パスワード</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="password"
              type="text"
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

          <FormControl id="newEmail" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>新しいメールアドレス</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="newEmail"
              type="text"
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
