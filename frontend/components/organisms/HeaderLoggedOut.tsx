'use client'
import { Box, Heading, HStack, Image, Spacer } from '@chakra-ui/react'

import { LoginButton, SignUpButton } from '../atoms/Buttons'

export function HeaderLoggedOut() {
  return (
    <HStack as="header" py="18px" margin="0 auto" maxW="1512px">
      <HStack spacing={0}>
        <Box pl="22px">
          <Image boxSize="52px" src="../images/js-logo.png" alt="JSロゴ" />
        </Box>
        <Heading
          as="h1"
          fontSize="30px"
          fontFamily="Inter"
          fontWeight="400px"
          pl="17px"
        >
          JS学習プラットフォーム
        </Heading>
      </HStack>
      <Spacer />
      <HStack spacing="40px" pr="40px">
        <LoginButton />
        <SignUpButton />
      </HStack>
    </HStack>
  )
}
