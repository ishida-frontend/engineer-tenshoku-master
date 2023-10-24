import React from 'react'
import { Progress } from '@chakra-ui/react'

export const CourseProgressBar = ({
  completePercentage,
}: {
  completePercentage: number
}) => {
  return <Progress colorScheme="green" size="sm" value={completePercentage} />
}
