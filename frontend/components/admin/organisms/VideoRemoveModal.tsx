'use client'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { mutate } from 'swr'

import { useCustomToast } from '../../../hooks/useCustomToast'

export function VideoRemoveModal({
  courseId,
  videoId,
}: {
  courseId: number
  videoId: number
}) {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showModalContent, setShowModalContent] = useState(true)

  const deleteVideo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video/delete/${videoId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: videoId,
          }),
        },
      )

      const result = await response.json()
      if (response.ok) {
        showSuccessToast(result.message)
        setShowModalContent(false)
        onClose()
        mutate(`course${courseId}`)
      } else {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('動画の削除に失敗しました')
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
            <ModalHeader>この動画を削除しますか？</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                いいえ
              </Button>
              <Button colorScheme="red" mr={3} onClick={deleteVideo}>
                はい
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}
