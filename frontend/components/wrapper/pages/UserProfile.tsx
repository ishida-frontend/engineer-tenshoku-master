'use client'
import React, { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { UserType, UserProfileType } from '../../../types'
import { UserProfile } from '../../../components/pages/UserProfile'
import Error from '../../../app/error'
import { updateUserProfile } from '../../../app/api'
import { useCustomToast } from '../../../hooks/useCustomToast'

export function UserProfileWrapper({ user }: { user: UserType }) {
  try {
    const [userProfile, setUserProfile] = useState<UserProfileType>({
      id: user.id,
      name: user.name,
      oneWord: user.oneWord,
      goal: user.goal,
      github: user.github,
      x: user.x,
    })
    const [modalUserProfile, setModalUserProfile] = useState(userProfile)
    const { showSuccessToast, showErrorToast } = useCustomToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
      nameError: '',
      oneWordError: '',
      goalError: '',
      githubError: '',
      xError: '',
    })
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
          githubError: '',
          xError: '',
        })
        setUserProfile(modalUserProfile)
        onClose()
        showSuccessToast('プロフィールを更新しました。')
      } else if (result && result.errors) {
        setErrors({
          nameError: result.errors.name || '',
          oneWordError: result.errors.oneWord,
          goalError: result.errors.goal,
          githubError: result.errors.github,
          xError: result.errors.x,
        })
      } else {
        showErrorToast('プロフィールを更新できませんでした。')
      }
    }
    return (
      <UserProfile
        userProfile={userProfile}
        modalUserProfile={modalUserProfile}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isLoading={isLoading}
        setModalUserProfile={setModalUserProfile}
        errors={errors}
        isButtonDisabled={isButtonDisabled}
        handleEditProfile={handleEditProfile}
      />
    )
  } catch (e) {
    return <Error />
  }
}
