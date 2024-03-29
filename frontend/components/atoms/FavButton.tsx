import React from 'react'
import { Button } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const FavButton = ({
  favoritedStatus,
  loadingState,
  handleFavoriteVideoStatus,
}: {
  favoritedStatus: boolean
  loadingState: boolean
  handleFavoriteVideoStatus: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
}) => {
  return (
    <Button
      onClick={(e) => {
        handleFavoriteVideoStatus(e)
      }}
      isLoading={loadingState}
      color="teal.500"
      size="sm"
    >
      {favoritedStatus ? (
        <AiFillStar size="24px" />
      ) : (
        <AiOutlineStar size="24px" />
      )}
    </Button>
  )
}
