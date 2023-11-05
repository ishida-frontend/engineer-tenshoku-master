'use client'
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Text,
  Stack,
  VStack,
  useDisclosure,
  Icon,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { AiOutlineUser } from 'react-icons/ai'
import { SlBubble } from 'react-icons/sl'
import { GoGoal } from 'react-icons/go'

import { updateUserProfile } from '../../app/api'
import { UserProfileEditModal } from '../../components/organisms/UserProfileEditModal'
import { UserType, UserProfileType } from '../../types'
import { useCustomToast } from '../../hooks/useCustomToast'

export function UserProfile({ user }: { user: UserType }) {
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    id: user.id,
    name: user.name,
    oneWord: user.oneWord,
    goal: user.goal,
    github: user.github,
    x: user.x,
  })
  const [modalUserProfile, setModalUserProfile] = useState(userProfile)

  const [errors, setErrors] = useState({
    nameError: '',
    oneWordError: '',
    goalError: '',
  })

  const { showSuccessToast, showErrorToast } = useCustomToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setUserProfile({
      id: user.id,
      name: user.name,
      oneWord: user.oneWord,
      goal: user.goal,
      github: user.github,
      x: user.x,
    })
  }, [user])

  const isButtonDisabled = () => {
    const hasChanges =
      JSON.stringify(modalUserProfile) !== JSON.stringify(userProfile)
    return !hasChanges || modalUserProfile.name === ''
  }

  const handleEditProfile = async () => {
    setIsLoading(true)
    const result = await updateUserProfile(modalUserProfile)
    setIsLoading(false)

    if (result && result.success) {
      setErrors({
        nameError: '',
        oneWordError: '',
        goalError: '',
      })
      setUserProfile(modalUserProfile)
      onClose()
      showSuccessToast('プロフィールを更新しました。')
    } else if (result && result.errors) {
      setErrors({
        nameError: result.errors.name || '',
        oneWordError: result.errors.oneWord,
        goalError: result.errors.goal,
      })
    } else {
      showErrorToast('プロフィールを更新できませんでした。')
    }
  }

  return (
    <Container maxW="420px" p="0" my="50px">
      <VStack>
        <Avatar
          size="xl"
          bg="blue.300"
          color="black"
          icon={<AiOutlineUser fontSize="4rem" />}
        />

        <Text as="b" fontSize="2xl">
          {userProfile.name}
        </Text>
      </VStack>
      <Stack>
        {userProfile.oneWord ? (
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
              {userProfile.oneWord}
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

        {userProfile.goal ? (
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
                {userProfile.goal}
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

        {userProfile.github ? (
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
              <Link href={`${userProfile.github}`}>
                <Text>{userProfile.github}</Text>
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

        {userProfile.x ? (
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
              <Link href={`${userProfile.x}`}>
                <Text>{userProfile.x}</Text>
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

        <Flex justifyContent="right">
          <Button
            onClick={onOpen}
            colorScheme="green"
            w="60px"
            h="40px"
            fontSize="14px"
          >
            編集
          </Button>
        </Flex>
        <UserProfileEditModal
          isOpen={isOpen}
          onClose={onClose}
          isLoading={isLoading}
          isButtonDisabled={isButtonDisabled}
          modalUserProfile={modalUserProfile}
          setModalUserProfile={setModalUserProfile}
          errors={errors}
          handleEditProfile={handleEditProfile}
        />
      </Stack>
    </Container>
  )
}
