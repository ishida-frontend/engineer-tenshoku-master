import React, { useState } from 'react'
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from '@chakra-ui/react'

import { CourseListType } from '../../types'
import { Loader } from '../atoms/Loader'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { SearchIcon } from '@chakra-ui/icons'
import { CourseCard } from '../atoms/CourseCard'
import { LineBanner } from '../atoms/LineBanner'
import { AchievementBanner } from '../atoms/AchievementBanner'

type CourseListProps = {
  courses: CourseListType[]
  handleTextChange: (text: string) => void
}

export function CourseList({ courses, handleTextChange }: CourseListProps) {
  if (!courses) return <Loader />
  const [text, setText] = useState<string>()

  const handleSubmit = () => {
    handleTextChange(text || '')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    handleSubmit()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <Center>
      <VStack>
        <Flex gap={10}>
          <Box mb={10} minW={'880px'}>
            <Heading
              py={10}
              color={PRIMARY_FONT_COLOR}
              fontSize="36px"
              textAlign="center"
            >
              コース一覧
            </Heading>
            <Flex justifyContent={'flex-end'} mb={4}>
              <InputGroup width="300px">
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
            </Flex>
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
            {courses && <CourseCard courses={courses} />}
          </Box>
          <VStack mt={40} gap={10}>
            <LineBanner />
            <AchievementBanner />
            <Link>
              <Image 
              src='images\img_linebanner.png' width="210px"></Image>
            </Link>
          </VStack>
        </Flex>
      </VStack>
    </Center>
  )
}
