import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react'
import { useDeleteItem } from '../../../hooks/useDeleteItem'

export const DeleteConfirmModal = ({
  id,
  itemToDelete,
  isOpen,
  onClose,
}: {
  id: string
  itemToDelete: string
  isOpen: boolean
  onClose: () => void
}) => {
  const { deleteItem } = useDeleteItem()

  const handleDelete = () => {
    deleteItem({ id, itemToDelete })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>削除しますか？</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            はい
          </Button>
          <Button variant="ghost" onClick={onClose}>
            いいえ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
