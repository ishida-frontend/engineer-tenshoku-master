import { Button } from '@chakra-ui/react'

export const DeleteButton = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Button colorScheme="red" onClick={onOpen}>
      削除
    </Button>
  )
}
