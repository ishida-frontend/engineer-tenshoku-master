'use client'
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'

import { TitleLogo } from '../atoms/TitleLogo'
import { FC, ReactNode } from 'react'
import { PATHS } from '../../constants/paths'

type HeaderLoggedInType = {
  user: {
    id: string
    isAdmin: boolean
    name: string
  }
  signOut: () => Promise<void>
}

type MenuLinkItemProps = {
  path?: string
  icon: ReactNode
  text: string
  onClick?: () => void
}

export function HeaderLoggedIn({ user, signOut }: HeaderLoggedInType) {
  const MenuLinkItem: FC<MenuLinkItemProps> = ({
    path,
    icon,
    text,
    onClick,
  }) => {
    return path ? (
      <Link href={path} _hover={{ textDecoration: 'none' }}>
        <MenuItem>
          <HStack>
            {icon}
            <Text>{text}</Text>
          </HStack>
        </MenuItem>
      </Link>
    ) : (
      <MenuItem onClick={onClick}>
        <HStack>
          {icon}
          <Text>{text}</Text>
        </HStack>
      </MenuItem>
    )
  }

  const handleLogout = async () => {
    await signOut()
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
            <HStack pr="36px">
              <Box fontSize={'20px'} marginRight={'8px'}>
                {user.name}
              </Box>
              <Menu>
                <Tooltip label="メニュー">
                  <MenuButton>
                    <Avatar
                      bg="blue.300"
                      color="black"
                      icon={<AiOutlineUser fontSize="2rem" />}
                    />
                  </MenuButton>
                </Tooltip>
                <MenuList>
                  <MenuLinkItem
                    path={`${PATHS.PROFILE.path}`}
                    icon={<AiOutlineUser />}
                    text="プロフィール"
                  />
                  <MenuLinkItem
                    path={`${PATHS.VIDEO.FAVORITE.path}`}
                    icon={<AiOutlineStar />}
                    text="お気に入り動画"
                  />
                  <MenuLinkItem
                    icon={<FiLogOut />}
                    text="ログアウト"
                    onClick={handleLogout}
                  />
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}
