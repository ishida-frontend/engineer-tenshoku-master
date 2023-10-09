import React from 'react'
import { Button } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const FavButton = ({
  isFavorited,
  isLoading,
  handleFavoriteVideoStatus,
}: {
  isFavorited: boolean
  isLoading: boolean
  handleFavoriteVideoStatus: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
}) => {
  return (
    <Button
      onClick={(e) => {
        handleFavoriteVideoStatus(e)
      }}
      isDisabled={isLoading}
      color="teal.500"
      height="32px"
    >
      {isFavorited ? <AiFillStar size="24px" /> : <AiOutlineStar size="24px" />}
    </Button>
  )
}
