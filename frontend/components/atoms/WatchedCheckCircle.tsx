import React from 'react'
import { Text } from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

export const WatchedCheckCircle = ({
  checkedStatus,
}: {
  checkedStatus: boolean
}) => {
  return (
    <Text color="teal.500">
      {checkedStatus ? <GoCheckCircleFill /> : <GoCircle />}
    </Text>
  )
}
