'use client'
import { useState } from 'react'
import { Box, Button, Spinner, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'

export default function Page() {
  const check = useAuth()
  const [fontSize, setFontSize] = useState(16)

  const increase = () => {
    setFontSize((prev) => Math.min(50, prev + 2))
  }

  const decrease = () => {
    setFontSize((prev) => Math.max(10, prev - 2))
  }

  if (!check.checked) {
    return <Spinner />
  }

  if (check.isAuthenticated) {
    return <Box>認証成功</Box>
  }

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <Box>
        <Stack direction="row" spacing={4}>
          <Button bg="teal.300" color="white" onClick={increase}>
            拡大
          </Button>
          <Button bg="red.300" color="white" onClick={decrease}>
            縮小
          </Button>
        </Stack>
        <Text fontSize={fontSize + 'px'}>
          上のボタンを押すと、このテキストのサイズが変わります(最小サイズ：10px・最大サイズ：50px)。
        </Text>
      </Box>
    </>
  )
}
