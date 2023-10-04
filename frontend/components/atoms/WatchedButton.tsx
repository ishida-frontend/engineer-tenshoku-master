import React from 'react'
import { Button, HStack, Text } from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

export const WatchedButton = ({
  isWatched,
  handleViewingStatus,
  isLoading,
}: {
  isWatched: boolean
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
}) => {
  return (
    <Button
      onClick={(e) => {
        console.log('Button clicked. Current isWatched status:', isWatched)
        handleViewingStatus(e)
      }}
      // onClick={handleViewingStatus}
      isLoading={isLoading}
      color="teal.500"
      backgroundColor="white"
      border="1px"
      height="34px"
      fontSize="14px"
    >
      <HStack mr="3px">
        {isWatched ? (
          <GoCheckCircleFill size="20px" />
        ) : (
          <GoCircle size="20px" />
        )}
        <Text>視聴完了</Text>
      </HStack>
    </Button>
  )
}
