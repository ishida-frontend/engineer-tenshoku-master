'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Button, Text, VStack, useDisclosure } from '@chakra-ui/react'

import { updateUserProfile } from 'app/api'
import { UserProfileEditModal } from 'components/organisms/UserProfileEditModal'
import { UserType, UserProfileType } from 'types'

export function UserProfile({ userData }: { userData: UserType }) {
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    id: userData.id,
    name: userData.name,
    oneWord: userData.oneWord,
    goal: userData.goal,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const handleEditProfile = useCallback(async () => {
    setIsLoading(true)
    await updateUserProfile(userProfile)
    setIsLoading(false)
    onClose()
  }, [userProfile, onClose])

  useEffect(() => {
    setUserProfile({
      id: userData.id,
      name: userData.name,
      oneWord: userData.oneWord,
      goal: userData.goal,
    })
  }, [userData])

  return (
    <VStack>
      <Text>{userProfile.name}</Text>
      <Text>{userProfile.oneWord}</Text>
      <Text>{userProfile.goal}</Text>
      <Button onClick={onOpen}>編集</Button>
      <UserProfileEditModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleEditProfile={handleEditProfile}
      />
    </VStack>
  )
}
