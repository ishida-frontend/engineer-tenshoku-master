import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { TimeIcon } from '@chakra-ui/icons'
import { Tag } from '../atoms/Tag'
import { CourseListType } from '../../types'

type CourseCardProp = {
  courses: CourseListType[]
}

export function CourseCard({ courses }: CourseCardProp) {
  return (
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
                {course.tags.map((courseTag) => (
                  <Tag
                    key={courseTag.tag.id}
                    color={courseTag.tag.color}
                    backgroundColor={courseTag.tag.backgroundColor}
                  >
                    {courseTag.tag.name}
                  </Tag>
                ))}
              </HStack>
            )}
            {course.requiredTime && (
              <Flex
                position={'absolute'}
                bottom={'13px'}
                height={'15px'}
                color={'gray.500'}
              >
                <TimeIcon w={'15px'} lineHeight={'15px'} />
                <Text pl={'5px'} lineHeight={'15px'}>
                  {course.requiredTime}h
                </Text>
              </Flex>
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
  )
}
