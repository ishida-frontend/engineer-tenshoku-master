import React from 'react'
import { Text } from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

export const WatchedCheckCircle = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <Text color="teal.500">
      {isChecked ? <GoCheckCircleFill /> : <GoCircle />}
    </Text>
  )
}
