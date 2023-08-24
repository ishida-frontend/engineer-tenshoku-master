'use client'
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Spacer,
} from '@chakra-ui/react'

import jsLogo from '../../public/images/js-logo.png'

export function HeaderLoggedOut() {
  return (
    <Box as="body" pt="100px">
      <HStack
        as="header"
        py="18px"
        margin="0 auto"
        maxW="1512px"
        top="0"
        position="fixed"
        width="100%"
        zIndex="10"
        bg="white"
        boxShadow="base"
      >
        <HStack spacing={0}>
          <Box pl="22px">
            <Image boxSize="52px" src={jsLogo.src} alt="JSロゴ" />
          </Box>
          <Heading as="h1" fontSize="30px" fontWeight="400" pl="17px">
            JS学習プラットフォーム
          </Heading>
        </HStack>
        <Spacer />
        <HStack spacing="40px" pr="40px">
          <Link href="/auth/login">
            <Button
              w="144px"
              h="64px"
              fontSize="24px"
              bg="green.500"
              color="white"
              borderRadius="12px"
            >
              ログイン
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              w="144px"
              h="64px"
              fontSize="24px"
              bg="white"
              border="1px"
              borderColor="blackAlpha.400"
              borderRadius="12px"
            >
              新規登録
            </Button>
          </Link>
        </HStack>
      </HStack>
    </Box>
  )
}
