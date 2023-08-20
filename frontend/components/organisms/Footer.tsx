'use client'
import {
  Box,
  Container,
  HStack,
  Image,
  Link,
  Spacer,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { AiFillYoutube, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai'

export function Footer() {
  const alignBp = useBreakpointValue({
    base: 'center',
    md: 'left',
  })

  const logoTitle = () => (
    <>
      <Image boxSize="45px" src="../images/jslogo.png" alt="JSロゴ" />
      <Link href="/" _hover={{ textDecoration: 'none' }}>
        <Text ml={1} fontSize={{ base: '24px', md: '30px' }}>
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
        <VStack spacing={0.25} pt={12} fontSize="16px" align={alignBp}>
          <Link href="/contact">お問い合わせ</Link>
          <Link href="#">ヘルプページ</Link>
          <Link href="#">利用規約</Link>
          <Link href="#">プライバシーポリシー</Link>
          <Link href="#">特定商取引法に基づく表記</Link>
        </VStack>

        <VStack spacing={4} mt={8} align={alignBp}>
          <HStack spacing="18px" display={{ base: 'flex', md: 'none' }}>
            {snsIcons()}
          </HStack>
          <HStack>
            <HStack spacing={4} width="100%" mb={4} fontSize="30px">
              {logoTitle()}
              <Spacer display={{ base: 'none', md: 'flex' }} />
            </HStack>

            <HStack
              spacing="23px"
              display={{ base: 'none', md: 'flex' }}
              mb={5}
              pr={2}
              fontSize="24px"
            >
              {snsIcons()}
            </HStack>
          </HStack>
        </VStack>
        <Text pt={2} pb={4} fontSize="12px" align="center">
          &copy; {new Date().getFullYear()} JS学習プラットフォーム
        </Text>
      </Container>
    </Box>
  )
}
