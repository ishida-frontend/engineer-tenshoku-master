import React from 'react'
import { IconButton, Icon } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

export const GoodButton = ({
  isLiked,
  handleLike,
  likeCount,
}: {
  isLiked: boolean
  handleLike: (event: React.MouseEvent<HTMLButtonElement>) => void
  likeCount: number
}) => {
  return (
    <div>
      <IconButton
        onClick={(e) => {
          handleLike(e)
        }}
        icon={isLiked ? <Icon as={FaRegThumbsUp} /> : <Icon as={FaThumbsUp} />}
        aria-label="Like Button"
        variant="ghost"
        color="teal.500"
      >
        {likeCount}
      </IconButton>
    </div>
  )
}
