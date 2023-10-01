'use client'
import React from 'react'
import { Text } from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

export const WatchedCheckCircle = ({} // viewingStatus,
: {
  // viewingStatus: string | null
}) => {
  return (
    <Text color="teal.500">
      {/* {viewingStatus === 'WATCHED' ? <GoCheckCircleFill /> : <GoCircle />} */}
      <GoCheckCircleFill />
    </Text>
  )
}
