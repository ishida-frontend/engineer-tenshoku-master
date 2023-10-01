'use client'
import React from 'react'
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'

export const VideoBookmark = ({ isBookmarked }: { isBookmarked: boolean }) => {
  return isBookmarked ? (
    <BsFillBookmarkFill size="24px" color="#38A169" />
  ) : (
    <BsBookmark size="24px" color="#38A169" />
  )
}
