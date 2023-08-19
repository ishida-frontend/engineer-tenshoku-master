'use client'
import { Box, Flex, Link, Text, Stack, Image } from '@chakra-ui/react'
import { AiFillYoutube, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai'

export function Footer() {
  return (
    <Box as="footer" bgColor={'blackAlpha.800'} color="white">
      <Stack spacing={1}>
        <Link href="/contact">お問い合わせ</Link>
        <Link href="#">ヘルプページ</Link>
        <Link href="#">利用規約</Link>
        <Link href="#">プライバシーポリシー</Link>
        <Link href="#">特定商取引法に基づく表記</Link>
      </Stack>
      <Flex fontSize='30px' justify='left'>
        <Image borderRadius='full' boxSize='48px' src='../images/jsLogo.png'  />JS学習プラットフォーム
      </Flex>
      <Flex justify='right'>
        <AiFillYoutube />
        <AiOutlineTwitter />
        <AiFillFacebook />
      </Flex>
      <Text fontSize="12px">
        &copy; {new Date().getFullYear()} JS学習プラットフォーム
      </Text>
    </Box>
  )
}
