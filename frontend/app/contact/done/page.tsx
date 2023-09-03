'use client'
import React from 'react'
import { Container, Button, Text, Heading, Stack, Box } from '@chakra-ui/react'
import { HeaderLoggedIn } from '../../../components/organisms/HeaderLoggedIn'
import { HeaderLoggedOut } from '../../../components/organisms/HeaderLoggedOut'
import { Footer } from '../../../components/organisms/Footer'
import Link from 'next/link'
import { EmailIcon } from '@chakra-ui/icons'

export default function UserContactDone() {
  return (
    <Box minH={'100vh'} bg={'gray.200'}>
      <HeaderLoggedIn />
      <Container
        bg="white"
        height={'723px'}
        maxW={'1024px'}
        mt={'60px'}
        centerContent
      >
        <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
          お問い合わせが送信されました
        </Heading>
        <EmailIcon mt={'80px'} boxSize={16} color="teal" />
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
      <Footer />
    </Box>
  )
}
