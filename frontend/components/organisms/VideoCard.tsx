import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'

import { CourseType } from '../../types'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'

export function VideoCard({ course }: { course: CourseType }) {
  return (
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
  )
}
