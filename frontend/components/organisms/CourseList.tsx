import React, { useState } from 'react'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'

import { CourseType, CourseWithSectionsType } from '../../types'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'
import { Loader } from '../atoms/Loader'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { SearchIcon } from '@chakra-ui/icons'
import Link from 'next/link'

type CourseListProps = {
  courses: (CourseType & {
    sections: (SectionType & { videos: VideoType[] })[]
  })[]
  handleTextChange: (event: any) => void
}

export function CourseList({ courses, handleTextChange }: CourseListProps) {
  if (!courses) return <Loader />
  const [text, setText] = useState<string>()

  const handleSubmit = () => {
    handleTextChange(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    handleSubmit()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <Center bg={'gray.200'}>
      <Link href="/contact">お問い合わせ</Link>
      <VStack mx="auto" padding={'60px 96px'}>
        <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
          コース一覧
        </Heading>
        <Box marginLeft={'auto'}>
          <InputGroup>
            <Input
              value={text}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              variant="outline"
              placeholder="javaScript"
              background={'white'}
            />
            <InputRightElement onClick={() => handleSubmit()}>
              <SearchIcon color="gray.500" />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box mb={10} minW={'1024px'}>
          <Flex
            alignItems="center"
            pb={2}
            borderBottom="1px"
            borderColor={'blackAlpha.500'}
          ></Flex>
          {courses.length === 0 && (
            <VStack mt="40px">
              <Heading color={PRIMARY_FONT_COLOR} fontSize="36px">
                検索に一致するコースはありませんでした
              </Heading>
            </VStack>
          )}
          {courses && (
            <SimpleGrid
              columns={3}
              mt="40px"
              spacingX="auto"
              spacingY="10"
              minW={'100%'}
            >
              {courses.map((course: CourseWithSectionsType) => (
                <Card
                  key={course.id}
                  w="288px"
                  boxShadow="md"
                  borderRadius="8px"
                  margin={'auto'}
                >
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
                      {/* <Link
                        href={`/course/${course.id}/${}`}
                        mt="2"
                        color={PRIMARY_FONT_COLOR}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Flex alignItems="center">
                          <BsChevronRight size="20" />
                          <Text pl={3}>もっと見る</Text>
                        </Flex>
                      </Link> */}
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </VStack>
    </Center>
  )
}
