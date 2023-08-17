'use client'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Register() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async (e) => {
    // https://github.com/ishida-frontend/engineer-tenshoku-master/pull/59
    e.preventDefault()
    console.log(formState)
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
  }

  return (
    <Box bg={'gray.200'}>
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
          <FormControl id="username" isRequired>
            <Container ml={'0px'} pb={'10px'} pl={'0px'}>
              <Flex>
                <Text>お名前</Text>
                <Text color="teal">(必須)</Text>
              </Flex>
            </Container>
            <Input
              id="courseName"
              type="text"
              value={formState.username}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  username: e.target.value,
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

          <Container ml={'0px'} p={'0px'}>
            <HStack>
              <Checkbox
                colorScheme={'teal'}
                size={'lg'}
                onChange={() => setIsChecked(!isChecked)}
              />
              <Wrap>
                <Text>
                  <Link color="teal.500" href="#">
                    利用規約
                  </Link>
                  および
                  <Link color="teal.500" href="#">
                    プライバシーポリシー
                  </Link>
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

        <Box border={'1px solid '} />

        <Box>ログイン</Box>
      </Container>
    </Box>
  )
}
