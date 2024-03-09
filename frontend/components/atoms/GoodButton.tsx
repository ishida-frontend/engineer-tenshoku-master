import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

export const GoodButton = ({
  isLiked,
  handleLike,
  goodCount,
}: {
  goodCount: number
  isLiked: boolean
  handleLike: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <Button
      onClick={(e) => {
        handleLike(e)
      }}
      color="teal.500"
      backgroundColor="white"
      border="1px"
      height="34px"
      fontSize="14px"
    >
      <HStack mr="1px">
        {isLiked ? <FaRegThumbsUp size="20px" /> : <FaThumbsUp size="20px" />}
      </HStack>
    </Button>
  )
}
