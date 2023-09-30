'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

import { useCustomToast } from '../../../hooks/useCustomToast'
import { PATHS } from '../../../constants/paths'

export function CourseRemover() {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showModalContent, setShowModalContent] = useState(true)

  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId

  const deleteCourse = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/delete/${courseId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId,
          }),
        },
      )

      const result = await response.json()
      if (response.ok) {
        showSuccessToast(result.message)
        setShowModalContent(false)
        setTimeout(() => {
          router.push(PATHS.ADMIN.COURSE.LIST.path)
        }, 4000)
      } else {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('コースの削除に失敗しました。')
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
            <ModalHeader>このコースを削除しますか？</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={deleteCourse}>
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
