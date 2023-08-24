'use client'
import {
  Box,
  Container,
  HStack,
  Image,
  Link,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { AiFillYoutube, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai'

export function Footer() {
  const footerMenu = () => (
    <>
      <Link href="/contact">お問い合わせ</Link>
      {/* TODO: 以下のページ完成後にパスを置き換える */}
      <Link href="#">ヘルプページ</Link>
      <Link href="#">利用規約</Link>
      <Link href="#">プライバシーポリシー</Link>
      <Link href="#">特定商取引法に基づく表記</Link>
    </>
  )
  const logoAndTitle = () => (
    <>
      <Image boxSize="45px" src="../images/js-logo.png" alt="JSロゴ" />
      <Link href="/" _hover={{ textDecoration: 'none' }}>
        <Text ml={1} fontSize="30px">
          JS学習プラットフォーム
        </Text>
      </Link>
    </>
  )
  const snsIcons = () => (
    <>
      <Link href="#">
        <AiFillYoutube size={39} />
      </Link>
      <Link href="#">
        <AiOutlineTwitter size={36} />
      </Link>
      <Link href="#">
        <AiFillFacebook size={31} />
      </Link>
    </>
  )

  return (
    <Box as="footer" bgColor={'blackAlpha.900'} color="white">
      <Container maxW="1069px">
        {/* 幅768px以上の場合 */}
        <VStack display={{ base: 'none', md: 'flex' }} align="left">
          <Stack spacing={0.25} pt={12} fontSize="16px">
            {footerMenu()}
          </Stack>

          <HStack mt="36px">
            <HStack spacing={4} width="100%" mb={4} fontSize="30px">
              {logoAndTitle()}
            </HStack>

            <HStack spacing="23px" mb={5} pr={2} fontSize="24px">
              {snsIcons()}
            </HStack>
          </HStack>
        </VStack>

        {/* 幅768px未満の場合 */}
        <VStack display={{ base: 'flex', md: 'none' }}>
          <VStack spacing={0.25} pt={12} fontSize="16px">
            {footerMenu()}
          </VStack>

          <HStack spacing="18px" mt={8} justify="center">
            {snsIcons()}
          </HStack>

          <HStack mt="36px" justify="center">
            {logoAndTitle()}
          </HStack>
        </VStack>

        {/* 共通 */}
        <Text pt={2} pb={4} fontSize="12px" align="center">
          &copy; {new Date().getFullYear()} JS学習プラットフォーム
        </Text>
      </Container>
    </Box>
  )
}
