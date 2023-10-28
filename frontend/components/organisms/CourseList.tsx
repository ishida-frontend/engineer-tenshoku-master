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
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'

import { CourseTagType, CourseWithSectionsType } from '../../types'
import { Loader } from '../atoms/Loader'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { SearchIcon } from '@chakra-ui/icons'
import { Tag } from '../atoms/Tag'

type CourseListType = CourseWithSectionsType & CourseTagType
type CourseListProps = {
  courses: CourseListType[]
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
              {courses.map((course: CourseListType) => (
                <Card
                  key={course.id}
                  w="288px"
                  boxShadow="md"
                  borderRadius="8px"
                  margin={'auto'}
                  height={'330px'}
                >
                  <CardHeader p={0}>
                    <Image
                      src={`${course.image}`}
                      alt={`${course.name}の画像`}
                      fallbackSrc="images/img_no_image.png"
                      width="100%"
                      height="150px"
                      objectFit={'cover'}
                      borderRadius={'8px 8px 0 0'}
                    />
                  </CardHeader>
                  <CardBody
                    px={3}
                    pt={4}
                    pb={3}
                    display={'flex'}
                    flexDirection={'column'}
                    flex={'1 1 auto'}
                    position={'relative'}
                  >
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
                    {course.tags && (
                      <HStack flexWrap="wrap">
                        {course.tags.map((courseTag: any) => (
                          <Tag
                            color={courseTag.tag.color}
                            backgroundColor={courseTag.tag.backgroundColor}
                          >
                            {courseTag.tag.name}
                          </Tag>
                        ))}
                      </HStack>
                    )}
                    <Flex
                      justify="flex-end"
                      position={'absolute'}
                      bottom={'8px'}
                      right={'12px'}
                    >
                      <Link
                        href={`/course/${course.id}?videoId=${course.sections[0]?.videos[0]?.id}`}
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
          )}
        </Box>
      </VStack>
    </Center>
  )
}
