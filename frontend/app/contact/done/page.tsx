'use client'
import React from 'react'
import {
  Container,
  Button,
  Text,
  Heading,
  Stack,
  Center,
} from '@chakra-ui/react'
import Link from 'next/link'
import { EmailIcon } from '@chakra-ui/icons'

export default function UserContactDone() {
  return (
    <Center padding={'60px 96px'} bg={'gray.100'}>
      <Container bg="white" maxW={'1024px'} centerContent borderRadius={'4px'}>
        <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
          お問い合わせが送信されました
        </Heading>
        <EmailIcon mt={'14px'} boxSize={16} color="teal" />
        <Stack spacing={1} mt={'130px'}>
          <Text fontSize="md">
            お問い合わせいただき、ありがとうございます。
          </Text>
          <Text fontSize="md">
            担当の者よりご連絡させていただきますので、恐れ入りますがしばらくお待ちください。
          </Text>
        </Stack>
        <Button w={'140px'} mt={'50px'} mb={'250px'} colorScheme="teal">
          <Link href="/">トップに戻る</Link>
        </Button>
      </Container>
    </Center>
  )
}
