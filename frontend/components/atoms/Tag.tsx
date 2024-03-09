import { Tag as ChakraTag, TagLabel, TagProps } from '@chakra-ui/react'
import React from 'react'

export const Tag = (props: TagProps) => {
  return (
    <ChakraTag
      size="lg"
      variant="solid"
      colorScheme="teal"
      borderRadius="2px"
      padding="4px"
      fontWeight={'bold'}
      color={props.color}
      backgroundColor={props.backgroundColor}
      {...props}
    >
      <TagLabel>{props.children}</TagLabel>
    </ChakraTag>
  )
}
