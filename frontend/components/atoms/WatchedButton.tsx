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
  const [viewingStatus, setViewingStatus] = useState<string | null>(null)

  const toggleViewingStatus = () => {
    const newStatus = viewingStatus === 'WATCHED' ? 'NOT_WATCHED' : 'WATCHED'
    setViewingStatus(newStatus)
    updateViewingStatus({ userId, videoId, newStatus })
  }

  useEffect(() => {
    fetchViewingStatus()
  }, [])

  const fetchViewingStatus = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
    )
    const data = await res.json()

    setViewingStatus(data.status)
  }

  const updateViewingStatus = async ({
    userId,
    videoId,
    newStatus,
  }: {
    userId: string
    videoId: string
    newStatus: string
  }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, videoId, newStatus }),
        },
      )
    } catch (e: any) {
      console.error(e)
      throw e
      setViewingStatus(viewingStatus === 'WATCHED' ? 'NOT_WATCHED' : 'WATCHED')
    }
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
