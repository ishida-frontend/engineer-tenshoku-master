'use client'
import { useRouter } from 'next/navigation'

import { useCustomToast } from '../../../hooks/useCustomToast'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'

type DeleteButtonProps = {
  id: string
  itemToDelete: string
}

export const DeleteButton = ({ id, itemToDelete }: DeleteButtonProps) => {
  const router = useRouter()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const [showModalContent, setShowModalContent] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${itemToDelete}/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
          }),
        },
      )

      const result = await response.json()
      if (response.ok) {
        showSuccessToast(result.message)
        setShowModalContent(false)
        setTimeout(() => {
          router.push(`/admin/${itemToDelete}`)
        }, 4000)
      } else {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('削除に失敗しました。')
    }
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        削除
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {showModalContent && (
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
        )}
      </Modal>
    </>
  )
}
