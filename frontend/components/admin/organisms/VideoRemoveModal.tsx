'use client'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'
import { mutate } from 'swr'

import { useCustomToast } from '../../../hooks/useCustomToast'
import { SectionType } from '../../../types'

export function VideoRemoveModal({
  courseId,
  videoId,
  isOpen,
  onClose,
}: {
  courseId: string
  videoId: string | null
  isOpen: boolean
  onClose: () => void
}) {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const deleteVideo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video/${videoId}`,
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
        mutate(`course${courseId}`, (currentData) => {
          const updatedSections = currentData.sections.map(
            (section: SectionType) => {
              if (section.videos.some((video) => video.id === videoId)) {
                return {
                  ...section,
                  videos: section.videos.filter(
                    (video) => video.id !== videoId,
                  ),
                }
              }
              return section
            },
          )
          return { ...currentData, sections: updatedSections }
        })
        showSuccessToast(result.message)
        onClose()
      } else {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('削除に失敗しました')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
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
    </Modal>
  )
}
