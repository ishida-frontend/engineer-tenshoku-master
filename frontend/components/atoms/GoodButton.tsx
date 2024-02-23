import React from 'react'
import { IconButton, Icon } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

export const GoodButton = ({
  isLiked,
  handleLike,
  goodCount,
}: {
  isLiked: boolean
  handleLike: (event: React.MouseEvent<HTMLButtonElement>) => void
  goodCount: number
}) => {
  return (
    <IconButton
      onClick={(e) => {
        handleLike(e)
      }}
      icon={isLiked ? <Icon as={FaRegThumbsUp} /> : <Icon as={FaThumbsUp} />}
      aria-label="Like Button"
      variant="ghost"
      color="teal.500"
    >
      {goodCount}
    </IconButton>
  )
}
