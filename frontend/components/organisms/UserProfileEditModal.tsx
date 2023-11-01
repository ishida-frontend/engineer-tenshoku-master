import React, { Dispatch, SetStateAction } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Text,
  Textarea,
  FormErrorMessage,
  Icon,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { SlBubble } from 'react-icons/sl'
import { GoGoal } from 'react-icons/go'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { UserProfileType } from '../../types'

type UserProfileErrorType = {
  nameError: string
  oneWordError: string
  goalError: string
}

export function UserProfileEditModal({
  isOpen,
  onClose,
  isLoading,
  isButtonDisabled,
  modalUserProfile,
  setModalUserProfile,
  errors,
  handleEditProfile,
}: {
  isOpen: boolean
  onClose: () => void
  isLoading: boolean
  isButtonDisabled: () => boolean
  modalUserProfile: UserProfileType
  setModalUserProfile: Dispatch<SetStateAction<UserProfileType>>
  errors: UserProfileErrorType
  handleEditProfile: () => void
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      blockScrollOnMount={false}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
      <ModalContent>
        <ModalBody p="32px">
          <FormControl id="userName" isInvalid={!!errors.nameError}>
            <FormLabel htmlFor="userName">
              <Flex>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="20px"
                  h="20px"
                >
                  <AiOutlineUser size="20px" />
                </Box>
                <Text as="b" ml="10px" lineHeight="20px">
                  名前（必須）
                </Text>
                <FormErrorMessage my="0" ml="10px">
                  {errors.nameError}
                </FormErrorMessage>
              </Flex>
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
              bg="gray.100"
              autoFocus={true}
            />
          </FormControl>
          <FormControl id="oneWord" mt={4} isInvalid={!!errors.oneWordError}>
            <FormLabel htmlFor="oneWord">
              <Flex>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="20px"
                  h="20px"
                >
                  <SlBubble size="20px" color="gray" />
                </Box>
                <Text as="b" ml="10px" lineHeight="20px">
                  ひとこと
                </Text>
                <FormErrorMessage my="0" ml="10px">
                  {errors.oneWordError}
                </FormErrorMessage>
              </Flex>
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
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="goal" mt={4} isInvalid={!!errors.goalError}>
            <FormLabel htmlFor="goal">
              <Flex>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="20px"
                  h="20px"
                >
                  <GoGoal size="20px" color="green" />
                </Box>
                <Text as="b" ml="10px" lineHeight="20px">
                  目標
                </Text>
                <FormErrorMessage my="0" ml="10px">
                  {errors.goalError}
                </FormErrorMessage>
              </Flex>
            </FormLabel>
            <Textarea
              value={modalUserProfile.goal}
              onChange={(e) => {
                setModalUserProfile({
                  ...modalUserProfile,
                  goal: e.target.value,
                })
              }}
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="github" mt={4}>
            <FormLabel htmlFor="github">
              <Flex>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="20px"
                  h="20px"
                >
                  <Icon as={FaGithub} size="20px" color="gray" />
                </Box>
                <Text as="b" ml="10px" lineHeight="20px">
                  Github
                </Text>
              </Flex>
            </FormLabel>
            <Input
              type="text"
              value={modalUserProfile.github}
              onChange={(e) => {
                setModalUserProfile({
                  ...modalUserProfile,
                  github: e.target.value,
                })
              }}
              bg="gray.100"
            />
          </FormControl>
          <FormControl id="x" mt={4}>
            <FormLabel htmlFor="x">
              <Flex>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="20px"
                  h="20px"
                >
                  <Icon as={FaXTwitter} size="20px" color="gray" />
                </Box>
                <Text as="b" ml="10px" lineHeight="20px">
                  Github
                </Text>
              </Flex>
            </FormLabel>
            <Input
              type="text"
              value={modalUserProfile.x}
              onChange={(e) => {
                setModalUserProfile({
                  ...modalUserProfile,
                  x: e.target.value,
                })
              }}
              bg="gray.100"
            />
          </FormControl>
          <ModalFooter px="0" pb="0">
            <Flex justifyContent="right">
              <Button
                mr={3}
                onClick={onClose}
                bg="white"
                w="60px"
                h="40px"
                fontSize="14px"
              >
                閉じる
              </Button>
              <Button
                isLoading={isLoading}
                isDisabled={isButtonDisabled()}
                colorScheme="green"
                onClick={handleEditProfile}
                w="60px"
                h="40px"
                fontSize="14px"
              >
                更新
              </Button>
            </Flex>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
