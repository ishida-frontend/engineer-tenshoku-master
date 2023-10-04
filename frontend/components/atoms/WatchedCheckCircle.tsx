'use client'
import React from 'react'
import { Text } from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

export const WatchedCheckCircle = ({ isWatched }: { isWatched: boolean }) => {
  return (
    <Text color="teal.500">
      {isWatched ? <GoCheckCircleFill /> : <GoCircle />}
    </Text>
  )
}
