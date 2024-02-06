import React, { useState, useEffect } from 'react'
import { IconButton, Icon } from '@chakra-ui/react'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

export const GoodButton = ({ videoId, userId }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await fetch(`/api/good/${videoId}/check?userId=${userId}`)
        const data = await res.json()
        setIsLiked(data.liked)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchLikeStatus()
  }, [videoId, userId])

  const handleLike = async () => {
    const action = isLiked ? 'unlike' : 'like'
    try {
      await fetch(`/api/good/${videoId}/${action}`, {
        method: 'POST',
      })

      setIsLiked(!isLiked)
      setLikeCount((count) => (isLiked ? count - 1 : count + 1))
    } catch (error) {
      return (
        <div>
          <IconButton
            icon={
              isLiked ? <Icon as={FaRegThumbsUp} /> : <Icon as={FaThumbsUp} />
            }
            onClick={handleLike}
            aria-label="Like Button"
            variant="ghost"
          >
            {likeCount}
          </IconButton>
        </div>
      )
    }
  }
}
