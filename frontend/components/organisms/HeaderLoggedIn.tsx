'use client'
import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'

import { TitleLogo } from '../atoms/TitleLogo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PATHS } from '../../constants/paths'

type HeaderLoggedInType = {
  user: {
    id: string
    isAdmin: boolean
    name: string
  }
  signOut: () => Promise<void>
}
export function HeaderLoggedIn({ user, signOut }: HeaderLoggedInType) {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push(PATHS.LOGIN.path)
  }

  return (
    <Box boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)">
      <Box as="header" bgColor={'white'}>
        <Flex justify="center">
          <HStack maxW="1512px" py="19px" width="100%" zIndex="10">
            <HStack spacing={0}>
              <Box pl="22px">
                <TitleLogo boxSize="62px" />
              </Box>
              <Heading as="h1" fontSize="30px" fontWeight="400" pl="17px">
                JS学習プラットフォーム
              </Heading>
            </HStack>
            <Spacer />
            <HStack
              pr="36px"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              position={'relative'}
            >
              {/* TODO:プロフィールページへのリンクを貼る */}
              <Box fontSize={'20px'} marginRight={'8px'}>
                {user.name}
              </Box>
              <Avatar
                bg="blue.300"
                color="black"
                icon={<AiOutlineUser fontSize="2rem" />}
              />
              {show && (
                <Card
                  position={'absolute'}
                  top={'40px'}
                  right={'0'}
                  width={'200px'}
                >
                  表示されるメニュー
                  <Text onClick={handleLogout}>ログアウト</Text>
                </Card>
              )}
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}
