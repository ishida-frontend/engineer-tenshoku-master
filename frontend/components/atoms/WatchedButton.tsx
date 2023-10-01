'use client'
import React, { useState, useEffect } from 'react'
import { Button, HStack, Text } from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

export const WatchedButton = ({
  userId,
  videoId,
}: {
  userId: string
  videoId: string
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [viewingStatus, setViewingStatus] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
        )
        const data = await response.json()
        setViewingStatus(data.status)
      } catch (error) {
        console.error('Failed to fetch initial status', error)
      }
    }

    fetchInitialStatus()
  }, [userId, videoId])

  const updateViewingStatus = async ({
    newStatus,
    userId,
    videoId,
  }: {
    newStatus: string
    userId: string
    videoId: string
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, videoId, newStatus }),
        },
      )

      if (response.status === 404) {
        // statusデータが見つからない場合は、postでデータを新規作成
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, videoId, newStatus }),
          },
        )
      }
    } catch (error) {
      setViewingStatus(viewingStatus === 'WATCHED' ? 'NOT_WATCHED' : 'WATCHED')
      throw error
    }
  }

  const toggleViewingStatus = async () => {
    const newStatus = viewingStatus === 'WATCHED' ? 'NOT_WATCHED' : 'WATCHED'
    setViewingStatus(newStatus)

    await updateViewingStatus({ newStatus, userId, videoId })
  }

  return (
    <Button
      onClick={toggleViewingStatus}
      color="teal.500"
      backgroundColor="white"
      border="1px"
      height="34px"
      fontSize="14px"
    >
      <HStack mr="3px">
        {viewingStatus === 'WATCHED' ? (
          <GoCheckCircleFill size="20px" />
        ) : (
          <GoCircle size="20px" />
        )}
        <Text>視聴完了</Text>
      </HStack>
    </Button>
  )
}
