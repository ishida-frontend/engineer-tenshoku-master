'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { Box, Heading, Text } from '@chakra-ui/react'

export default function Error() {
  const router = useRouter()

  useEffect(() => {
    router.push('/course')
  }, [])

  return (
    <Box>
      <Heading as={'h2'}>エラーです</Heading>
      <Text>お時間をおいてお試しください</Text>
    </Box>
  )
}
