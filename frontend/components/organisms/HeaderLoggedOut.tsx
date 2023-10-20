'use client'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
} from '@chakra-ui/react'

import { TitleLogo } from '../atoms/TitleLogo'

export function HeaderLoggedOut() {
  return (
    <Box boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)">
      <Flex justify="center">
        <HStack maxW="1512px" py="19px" width="100%" zIndex="10">
          <HStack spacing={0}>
            <Box pl="22px">
              <TitleLogo boxSize="62px" />
            </Box>
            <Link href="/" _hover={{ textDecoration: 'none' }}>
              <Heading as="h1" fontSize="30px" fontWeight="400" pl="17px">
                JS学習プラットフォーム
              </Heading>
            </Link>
          </HStack>
          <Spacer />
          <HStack spacing="40px" pr="40px">
            <Link href="/auth/login">
              <Button
                w="120"
                h="48px"
                fontSize="18px"
                bg="green.500"
                color="white"
                borderRadius="12px"
              >
                ログイン
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                w="120"
                h="48px"
                fontSize="18px"
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
      </Flex>
    </Box>
  )
}
