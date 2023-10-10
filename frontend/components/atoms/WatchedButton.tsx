import React from 'react'
import { Button, HStack, Text } from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

export const WatchedButton = ({
  isWatched,
  isLoading,
  handleViewingStatus,
}: {
  isWatched: boolean
  isLoading: boolean
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <Button
      onClick={(e) => {
        handleViewingStatus(e)
      }}
      isDisabled={isLoading}
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
