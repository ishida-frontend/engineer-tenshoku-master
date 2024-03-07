import React from 'react'
import { Button, Icon } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

export const GoodButton = ({
  isLiked,
  handleLike,
}: {
  isLiked: boolean
  handleLike: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <Button
      onClick={(e) => {
        handleLike(e)
      }}
      icon={isLiked ? <Icon as={FaRegThumbsUp} /> : <Icon as={FaThumbsUp} />}
      aria-label="Like Button"
      variant="ghost"
      color="teal.500"
    />
  )
}
