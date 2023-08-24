'use client'
import { Avatar, Box, Heading, HStack, Image, Spacer } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'

import jsLogo from '../../public/images/js-logo.png'

export function HeaderLoggedIn() {
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
            <Image boxSize="64px" src={jsLogo.src} alt="JSロゴ" />
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
