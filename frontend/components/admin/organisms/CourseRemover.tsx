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

export function CourseRemover() {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showModalContent, setShowModalContent] = useState(true)

  const router = useRouter()
  const params = useParams()
  const courseid = params.courseid
  const id = typeof courseid === 'string' ? parseInt(courseid, 10) : NaN

  const deleteCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/admin/course/delete/${courseid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            deleted_at: true,
          }),
        },
      )

      const data = await response.json()
      if (response.ok) {
        showSuccessToast(data.message)
      } else {
        const data = await response.json()
        showErrorToast(data.message)
      }
    } catch (error) {
      showErrorToast('コースの削除に失敗しました。')
    } finally {
      setShowModalContent(false)
      setTimeout(() => {
        router.push('/admin/course')
      }, 4000)
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
            <ModalHeader>コースを削除しますか？</ModalHeader>
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
