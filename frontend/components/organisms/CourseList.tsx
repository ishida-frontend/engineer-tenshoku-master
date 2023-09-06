'use client'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'
import { RiReactjsLine } from 'react-icons/ri'

import { CourseType } from '../../types'
import { Loader } from '../atoms/Loader'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { useCustomToast } from '../../hooks/useCustomToast'

export function CourseList() {
  // カスタムフック準備
  const { showErrorToast } = useCustomToast()

  const courseListTheme = extendTheme({
    breakpoints: {
      md: '700px',
      lg: '1050px',
    },
  })

  const fetcher = async () =>
    (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all`)).json()

  const { data: courses, error } = useSWR('courseList', fetcher)

  // ページを開いて１０秒でデータ取得ができなかった場合のエラートースト
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error) {
        showErrorToast('コースの取得に失敗しました。')
      }
    }, 10000)
    return () => clearTimeout(timeout)
  }, [courses])

  // コースデータ読み込みアニメーション
  if (!courses) return <Loader />

  return (
    <ChakraProvider theme={courseListTheme}>
      <VStack mx="auto" padding={'60px 90px'}>
        <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
          コース一覧
        </Heading>
        <Box mb={10}>
          <Flex
            alignItems="center"
            pb={2}
            borderBottom="1px"
            borderColor={'blackAlpha.500'}
          >
            <Icon as={RiReactjsLine} fontSize={20} />
            <Text ml={2} fontSize={16} fontWeight="bold">
              React
            </Text>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            mt="40px"
            spacingX={[0, 10, 20]}
            spacingY="10"
          >
            {courses.map((course: CourseType) => (
              <Card key={course.id} w="288px" boxShadow="md" borderRadius="8px">
                <CardHeader p={0}>
                  <Image
                    src={`/images/${course.image}`}
                    alt={`${course.name}の画像`}
                    fallbackSrc="/images/img_no_image.png"
                    width="100%"
                    height="150px"
                    objectFit={'cover'}
                  />
                </CardHeader>
                <CardBody px={3} py={4}>
                  <Heading fontSize="16px">{course.name}</Heading>
                  <Text
                    h="34px"
                    mt={3}
                    lineHeight="16.94px"
                    fontSize="14px"
                    color={'blackAlpha.700'}
                    overflowWrap="break-word"
                    noOfLines={2}
                  >
                    {course.description}
                  </Text>
                  <Flex justify="flex-end">
                    <Link
                      href={`/course/${course.id}`}
                      mt="2"
                      color={PRIMARY_FONT_COLOR}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Flex alignItems="center">
                        <BsChevronRight size="20" />
                        <Text pl={3}>もっと見る</Text>
                      </Flex>
                    </Link>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </ChakraProvider>
  )
}
