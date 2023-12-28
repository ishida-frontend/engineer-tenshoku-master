import React, { useState } from 'react'
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Image, // 画像を表示するためのコンポーネント
  Link, // リンクを表示するためのコンポーネント
} from '@chakra-ui/react'

import { CourseListType } from '../../types'
import { Loader } from '../atoms/Loader'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { SearchIcon } from '@chakra-ui/icons'
import { CourseCard } from '../atoms/CourseCard'

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

  const MyImageComponent = () => {
    // 画像を表示するためのコンポーネント
    return (
      <Link
        href="https://utage-system.com/line/open/aEL6cT1I2zgk?mtid=qO58nDztMNCb"
        isExternal
      >
        <Image
          src="./images/img_linebanner.png" // 画像のURLを指定
          alt="LINEバナー" // 画像の代替テキスト
          boxSize="150px" // 画像のサイズを指定（任意）
          float="right" // 右寄せにするためのスタイル
          mr={4} // 右側の余白を設定
        />
      </Link>
    )
  }

  return (
    <Center>
      <VStack padding={'60px 96px'}>
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
        <Flex>
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
            {courses && <CourseCard courses={courses} />}
          </Box>
          <VStack>
            <Box></Box>
          </VStack>
        </Flex>
      </VStack>
    </Center>
  )
}
