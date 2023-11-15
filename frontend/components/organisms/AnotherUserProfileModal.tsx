import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Text,
  Stack,
  VStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { AiOutlineUser } from 'react-icons/ai'
import { SlBubble } from 'react-icons/sl'
import { GoGoal } from 'react-icons/go'
import { UserProfileType } from '../../types'

export function AnotherUserProfileModal({
  anotherUserProfile,
  isOpen,
  onClose,
}: {
  anotherUserProfile?: UserProfileType
  isOpen?: boolean
  onClose?: () => void
}) {
  console.log('userModal:')
  console.log('anotherUserProfile:', anotherUserProfile)
  console.log('isOpen:', isOpen)
  console.log('onClose:', onClose)
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
          <Container maxW="420px" p="0" my="50px">
            <VStack>
              <Avatar
                size="xl"
                bg="blue.300"
                color="black"
                icon={<AiOutlineUser fontSize="4rem" />}
              />

              <Text as="b" fontSize="2xl">
                {anotherUserProfile?.name}
              </Text>
            </VStack>
            <Stack>
              {anotherUserProfile?.oneWord ? (
                <Flex mt={10}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    borderColor="gray.400"
                    w="40px"
                    h="40px"
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                  >
                    <SlBubble size="20px" color="gray" />
                  </Box>

                  <Text ml="20px" fontSize="lg" lineHeight="40px">
                    {anotherUserProfile?.oneWord}
                  </Text>
                </Flex>
              ) : (
                <Box
                  mt={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="40px"
                  h="40px"
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                >
                  <SlBubble size="20px" color="gray" />
                </Box>
              )}

              {anotherUserProfile?.goal ? (
                <Flex my={5}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    borderColor="gray.400"
                    flexShrink={0}
                    w="40px"
                    h="40px"
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                  >
                    <GoGoal size="20px" color="green" />
                  </Box>
                  <Box>
                    <Text ml="20px" fontSize="lg" lineHeight="40px">
                      {anotherUserProfile?.goal}
                    </Text>
                  </Box>
                </Flex>
              ) : (
                <Box
                  my={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="40px"
                  h="40px"
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                >
                  <GoGoal size="20px" color="green" />
                </Box>
              )}

              {anotherUserProfile?.github ? (
                <Flex mt={10}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    borderColor="gray.400"
                    w="40px"
                    h="40px"
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                  >
                    <Icon as={FaGithub} size="20px" color="gray" />
                  </Box>
                  <Box ml="20px" fontSize="lg" lineHeight="40px">
                    <Link href={`${anotherUserProfile?.github}`}>
                      <Text>{anotherUserProfile?.github}</Text>
                    </Link>
                  </Box>
                </Flex>
              ) : (
                <Box
                  mt={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="40px"
                  h="40px"
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                >
                  <Icon as={FaGithub} size="20px" color="gray" />
                </Box>
              )}

              {anotherUserProfile?.x ? (
                <Flex mt={10}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    borderColor="gray.400"
                    w="40px"
                    h="40px"
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                  >
                    <Icon as={FaXTwitter} size="20px" color="gray" />
                  </Box>
                  <Box ml="20px" fontSize="lg" lineHeight="40px">
                    <Link href={`${anotherUserProfile?.x}`}>
                      <Text>{anotherUserProfile?.x}</Text>
                    </Link>
                  </Box>
                </Flex>
              ) : (
                <Box
                  mt={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  borderColor="gray.400"
                  w="40px"
                  h="40px"
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                >
                  <Icon as={FaXTwitter} size="20px" color="gray" />
                </Box>
              )}
            </Stack>
          </Container>
          <ModalFooter px="0" pb="0">
            <Button
              mr={3}
              onClick={onClose}
              bg="white"
              w="60px"
              h="40px"
              fontSize="14px"
              justifyContent="right"
            >
              閉じる
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
