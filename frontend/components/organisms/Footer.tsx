'use client'
import {
  Box,
  Container,
  extendTheme,
  HStack,
  Image,
  Link,
  Text,
  Spacer,
  VStack,
  ChakraProvider,
} from '@chakra-ui/react'
import { AiFillYoutube, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai'

export function Footer() {
  const footerTheme = extendTheme({
    breakpoints: {
      sm: '500px',
      md: '600px',
    },
  })
  return (
    <ChakraProvider theme={footerTheme}>
      <Box as="footer" bgColor={'blackAlpha.900'} color="white">
        <Container maxW="1024px">
          <Box mt={12}>
            <VStack align="left" spacing={1} fontSize="16px" lineHeight="24px">
              <Link href="/contact" mt={12}>
                お問い合わせ
              </Link>
              <Link href="#">ヘルプページ</Link>
              <Link href="#">利用規約</Link>
              <Link href="#">プライバシーポリシー</Link>
              <Link href="#">特定商取引法に基づく表記</Link>
            </VStack>
          </Box>
          <Box>
            <HStack mt={10} mb={3} fontSize="30px" justify="left">
              <Image boxSize="48px" src="../images/jslogo.png" />
              <Text fontSize={['16px', '20px', '30px']}>
                JS学習プラットフォーム
              </Text>
              <Spacer />
              <HStack spacing="30px" fontSize="24px">
                <Link href="#">
                  <AiFillYoutube />
                </Link>
                <Link href="#">
                  <AiOutlineTwitter />
                </Link>
                <Link href="#">
                  <AiFillFacebook />
                </Link>
              </HStack>
            </HStack>
          </Box>
          <Text align="center" fontSize="12px">
            &copy; {new Date().getFullYear()} JS学習プラットフォーム
          </Text>
        </Container>
      </Box>
    </ChakraProvider>
  )
}
