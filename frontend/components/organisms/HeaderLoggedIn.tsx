'use client'
import { Avatar, Box, Heading, HStack, Image, Spacer } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'

export function HeaderLoggedIn() {
  return (
    <Box as="body" pt="100px">
      {/* ヘッダーの表示スペース(100px)確保 */}
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
            <Image boxSize="64px" src="../images/js-logo.png" alt="JSロゴ" />
          </Box>
          <Heading as="h1" fontSize="30px" fontWeight="400" pl="17px">
            JS学習プラットフォーム
          </Heading>
        </HStack>
        <Spacer />
        <HStack pr="36px">
          {/* TODO:プロフィールページへのリンクを貼る */}
          <Avatar
            bg="blue.300"
            color="black"
            icon={<AiOutlineUser fontSize="2rem" />}
          />
        </HStack>
      </HStack>
    </Box>
  )
}
