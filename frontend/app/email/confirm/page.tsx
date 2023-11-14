'use client'
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function EmailChangeConfirmPage() {
  return (
    <Center padding="60px 96px" bg={'gray.200'}>
      <Container padding="60px 96px" bg={'white'}>
        <Heading fontSize="2xl" mb="60px" textAlign="center" fontWeight="bold">
          認証コードを入力
        </Heading>

        <Box mb="28px">
          新しいメールアドレス宛に送信した認証コードを入力してください。
        </Box>

        <FormControl id="verificationCode" mb="42px" isRequired>
          <Input
            id="verificationCode"
            type="text"
            aria-required={true}
            border="1px"
            borderColor="gray.400"
            placeholder="認証コード"
          />
        </FormControl>

        <Button w="100%" mb="42px" colorScheme="teal">
          認証する
        </Button>

        <Box color="teal">
          <Link as={NextLink} href="/auth/login">
            ログイン
          </Link>
        </Box>
      </Container>
    </Center>
  )
}
