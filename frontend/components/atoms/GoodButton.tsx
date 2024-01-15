import React, { useState, useEffect } from 'react'
import { IconButton, Icon } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import axios from 'axios'
import { count } from 'console'

export const GoodButton = ({ videoId, userId }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    axios
      .get(`/api/good/${videoId}count`)
      .then((res) => {
        setLikeCount(res.data.count)
      })
      .catch((error) => {
        console.error('Error fetching like count', error)
      })

    axios
      .get(`/api/good/${videoId}/check`)
      .then((res) => {
        setIsLiked(res.data.liked)
      })
      .catch((error) => {
        console.error('Error checking if liked:', error)
      })
  }, [videoId])

  const handleLike = () => {
    const action = isLiked ? 'unlike' : 'like'
    axios
      .post(`/api/good/${videoId}/${action}`)
      .then((res) => {
        setIsLiked(!isLiked)
        setLikeCount((count) => (isLiked ? count - 1 : count + 1))
      })
      .catch((error) => {
        console.error('Error toggling like:', error)
      })
  }

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
