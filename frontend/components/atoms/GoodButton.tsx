import React, { useState, useEffect } from 'react'
import { IconButton, Icon } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

export const GoodButton = ({
  isLiked,
  handleLike,
  likeCount,
}: {
  isLiked: boolean
  handleLike: () => void
  likeCount: number
}) => {
  return (
    <div>
      <IconButton
        icon={isLiked ? <Icon as={FaRegThumbsUp} /> : <Icon as={FaThumbsUp} />}
        onClick={handleLike}
        aria-label="Like Button"
        variant="ghost"
      >
        {likeCount}
      </IconButton>
    </div>
  )
}
