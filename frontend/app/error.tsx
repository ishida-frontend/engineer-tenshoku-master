'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { Box, Heading, Text, Flex } from '@chakra-ui/react'
import { PATHS } from '../constants/paths'
export default function Error() {
  const router = useRouter()

  useEffect(() => {
    router.push(PATHS.COURSE.LIST.path)
  }, [])

  const test = 1

  return (
    <Box>
      <Heading as={'h2'}>エラーです</Heading>
      <Text>お時間をおいてお試しください</Text>
    </Box>
  )
}
