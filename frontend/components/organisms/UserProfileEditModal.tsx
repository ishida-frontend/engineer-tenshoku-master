import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Flex,
  Textarea,
} from '@chakra-ui/react'

import { UserProfileType } from 'types'

export function UserProfileEditModal({
  isOpen,
  onClose,
  isLoading,
  userProfile,
  setUserProfile,
  handleEditProfile,
}: {
  isOpen: boolean
  onClose: () => void
  isLoading: boolean
  userProfile: UserProfileType
  setUserProfile: Dispatch<SetStateAction<UserProfileType>>
  handleEditProfile: () => void
}) {
  const [modalUserProfile, setModalUserProfile] = useState(userProfile)

  useEffect(() => {
    setModalUserProfile(userProfile)
  }, [userProfile])

  const hasChanges =
    JSON.stringify(modalUserProfile) !== JSON.stringify(userProfile)

  const handleSave = () => {
    setUserProfile(modalUserProfile)
    handleEditProfile()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      blockScrollOnMount={false}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
      <ModalContent minW={'50%'} h={'70%'} px="24px">
        <ModalHeader>
          <Flex justifyContent="right">
            <Button
              mr={3}
              onClick={onClose}
              bgColor="white"
              w="60px"
              h="40px"
              fontSize="14px"
            >
              閉じる
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={!hasChanges}
              colorScheme="green"
              onClick={handleSave}
              w="60px"
              h="40px"
              fontSize="14px"
            >
              保存
            </Button>
          </Flex>
        </ModalHeader>
        <ModalBody p="0">
          <Container minW={'50%'}>
            <FormControl id="userName" isRequired>
              <FormLabel htmlFor="userName">
                <strong>ユーザー名</strong>
              </FormLabel>
              <Input
                type="text"
                value={modalUserProfile.name}
                onChange={(e) => {
                  setModalUserProfile({
                    ...modalUserProfile,
                    name: e.target.value,
                  })
                }}
                border="1px"
                borderColor="gray.400"
                autoFocus={true}
              />
            </FormControl>
            <FormControl id="oneWord" mt={10}>
              <FormLabel htmlFor="oneWord">
                <strong>ひとこと</strong>
              </FormLabel>
              <Input
                type="text"
                value={modalUserProfile.oneWord}
                onChange={(e) => {
                  setModalUserProfile({
                    ...modalUserProfile,
                    oneWord: e.target.value,
                  })
                }}
                border="1px"
                borderColor="gray.400"
              />
            </FormControl>
            <FormControl id="goal" mt={10}>
              <FormLabel htmlFor="goal">
                <strong>目標</strong>
              </FormLabel>
              <Textarea
                value={modalUserProfile.goal}
                onChange={(e) => {
                  setModalUserProfile({
                    ...modalUserProfile,
                    goal: e.target.value,
                  })
                }}
                border="1px"
                borderColor="gray.400"
              />
            </FormControl>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
