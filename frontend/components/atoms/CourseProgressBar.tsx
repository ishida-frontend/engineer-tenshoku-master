import React from 'react'
import { Box, Flex, Progress, Text } from '@chakra-ui/react'
import { BiSmile, BiWinkSmile } from 'react-icons/bi'

export const CourseProgressBar = ({
  completePercentage,
}: {
  completePercentage: number
}) => {
  console.log('completePercentage:', completePercentage)

  return (
    <Flex color="teal.400" fontWeight="700" py="2.5px" justify="space-evenly">
      <Box mt="2px">
        {completePercentage === 100 ? (
          <BiWinkSmile size="22px" />
        ) : (
          <BiSmile size="22px" />
        )}
      </Box>
      <Text fontSize="16px" mt="1px">
        {completePercentage.toFixed(0)}%
      </Text>
      <Progress
        w="300px"
        mt="7px"
        colorScheme="teal"
        value={completePercentage}
      />
    </Flex>
  )
}
