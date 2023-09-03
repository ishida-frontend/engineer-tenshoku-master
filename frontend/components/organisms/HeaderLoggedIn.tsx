'use client'
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'

import { TitleLogo } from '../atoms/TitleLogo'

export function HeaderLoggedIn() {
  return (
    <Box as="header" boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)">
      <Box bgColor={'white'}>
        <Flex justify="center">
          <HStack
            maxW="1512px"
            py="19px"
            top="0"
            position={'relative'}
            width="100%"
            zIndex="10"
          >
            <HStack spacing={0}>
              <Box pl="22px">
                <TitleLogo boxSize="62px" />
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
        </Flex>
      </Box>
    </Box>
  )
}
