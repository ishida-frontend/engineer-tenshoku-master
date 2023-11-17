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
  Link,
  Center,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { AiOutlineUser } from 'react-icons/ai'
import { SlBubble } from 'react-icons/sl'
import { GoGoal } from 'react-icons/go'
import { UserProfileType } from '../../types'

export function AnotherUserProfileModal({
  anotherUserProfile,
  isProfileOpen,
  closeProfileModal,
}: {
  anotherUserProfile: UserProfileType
  isProfileOpen: boolean
  closeProfileModal: () => void
}) {
  return (
    <Modal
      isOpen={isProfileOpen}
      onClose={closeProfileModal}
      scrollBehavior="inside"
      blockScrollOnMount={false}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
      <ModalContent>
        <ModalBody p="32px">
          <Container maxW="420px" p="0" my="50px">
            <VStack>
              <VStack>
                <Avatar
                  size="xl"
                  bg="blue.300"
                  color="black"
                  icon={<AiOutlineUser fontSize="4rem" />}
                />

                <Text as="b" fontSize="2xl">
                  {anotherUserProfile.name}
                </Text>
              </VStack>
              <Stack>
                <Flex mt={10}>
                  <Center
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    borderColor="gray.400"
                    w="40px"
                    h="40px"
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                  >
                    <SlBubble size="20px" color="gray" />
                  </Center>
                  {anotherUserProfile.oneWord && (
                    <Text ml="20px" fontSize="lg" lineHeight="40px">
                      {anotherUserProfile.oneWord}
                    </Text>
                  )}
                </Flex>

                <Flex my={5}>
                  <Center
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    borderColor="gray.400"
                    flexShrink={0}
                    w="40px"
                    h="40px"
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                    my={5}
                  >
                    <GoGoal size="20px" color="green" />
                  </Center>
                  {anotherUserProfile.goal && (
                    <Text ml="20px" fontSize="lg" lineHeight="40px">
                      {anotherUserProfile.goal}
                    </Text>
                  )}
                </Flex>

                {anotherUserProfile.github && (
                  <Flex mt={10}>
                    <Center
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="full"
                      borderColor="gray.400"
                      w="40px"
                      h="40px"
                      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                    >
                      <Icon as={FaGithub} size="20px" color="gray" />
                    </Center>
                    <Box ml="20px" fontSize="lg" lineHeight="40px">
                      <Link href={`${anotherUserProfile.github}`} isExternal>
                        <Text>{anotherUserProfile.github}</Text>
                      </Link>
                    </Box>
                  </Flex>
                )}

                {anotherUserProfile.x && (
                  <Flex mt={10}>
                    <Center
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="full"
                      borderColor="gray.400"
                      w="40px"
                      h="40px"
                      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                    >
                      <Icon as={FaXTwitter} size="20px" color="gray" />
                    </Center>
                    <Box ml="20px" fontSize="lg" lineHeight="40px">
                      <Link href={`${anotherUserProfile.x}`} isExternal>
                        <Text>{anotherUserProfile.x}</Text>
                      </Link>
                    </Box>
                  </Flex>
                )}
              </Stack>
            </VStack>
          </Container>
          <ModalFooter px="0" pb="0">
            <Button
              mr={3}
              onClick={closeProfileModal}
              bg="white"
              w="60px"
              h="40px"
              fontSize="14px"
            >
              閉じる
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
