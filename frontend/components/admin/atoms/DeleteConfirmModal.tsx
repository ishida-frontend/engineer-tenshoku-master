import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react'

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onClick,
}: {
  isOpen: boolean
  onClose: () => void
  onClick: () => void
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>削除しますか？</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClick}>
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
