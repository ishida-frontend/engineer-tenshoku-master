'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Container,
  Button,
  Text,
  Heading,
  VStack,
  HStack,
  Stack,
  extendTheme,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function UserContactDone() {
  const router = useRouter()
  await router.push('/contact/done')

  const theme = extendTheme({
    colors: {
      brand: {
        400: '#38B2AC',
      },
    },
  })
  return (
    <>
      <Container bg="gray.100" maxW={'1512px'}>
        <Container bg="white" maxW={'1024px'} centerContent>
          <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
            お問い合わせが送信されました
          </Heading>
          <EmailIcon mt={'80px'} boxSize={16} color="teal.400" />
          <Stack spacing={1} mt={'40px'}>
            <Text fontSize="md">
              お問い合わせいただき、ありがとうございます。
            </Text>
            <Text fontSize="md">
              担当のものよりご連絡させていただきますので、恐れ入りますがしばらくお待ちください。
            </Text>
          </Stack>
          <Button w={'140px'} mt={'60px'} colorScheme="teal">
            <Link href="/">トップに戻る</Link>
          </Button>
        </Container>
      </Container>
    </>
  )
}
