import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const FavIcon = ({ isFavorited }: { isFavorited: boolean }) => {
  return isFavorited ? (
    <AiFillStar size="24px" color="#38A169" />
  ) : (
    <AiOutlineStar size="24px" color="#38A169" />
  )
}
