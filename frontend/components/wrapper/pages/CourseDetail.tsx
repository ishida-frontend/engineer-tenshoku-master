'use client'
import React, { useEffect, useState } from 'react'
import {
  upsertViewingStatus,
  fetchButtonStatus,
  fetchCheckMarkStatuses,
} from '../../../app/api/course/[courseId]/viewingStatus'
import {
  upsertFavoriteVideo,
  fetchFavButtonStatus,
} from '../../../app/api/course/[courseId]/favoriteVideo'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { CourseDetail } from '../../pages/CourseDetail'
import Error from '../../../app/error'
import { useDisclosure } from '@chakra-ui/react'
import { UserProfileType, WrapperPropsType } from '../../../types'

export function CourseDetailWrapper(WrapperProps: WrapperPropsType) {
  const { showErrorToast } = useCustomToast()
  const userId = WrapperProps.userId
  const videoId = WrapperProps.videoId

  try {
    const [courseData, setCourseData] = useState(WrapperProps.initialCourseData)
    const {
      isOpen: isProfileOpen,
      onOpen: openProfileModal,
      onClose: closeProfileModal,
    } = useDisclosure()
    const [anotherUserProfile, setAnotherUserProfile] =
      useState<UserProfileType>()
    const [completePercentage, setCompletePercentage] = useState(0)
    const [watchedStatus, setWatchedStatus] = useState<Record<string, boolean>>(
      {},
    )
    const [checkedStatus, setCheckedStatus] = useState<Record<string, boolean>>(
      {},
    )
    const [favoritedStatus, setFavoritedStatus] = useState<
      Record<string, boolean>
    >({})
    const [isWatchingLoading, setIsWatchingLoading] = useState<boolean>()
    const [isFavoriteLoading, setIsFavoriteLoading] = useState<boolean>()

    const getCourseData = async (courseId: string) => {
      try {
        const courseData = await fetch(
          `${process.env.NEXT_PUBLIC_FRONT_API_URL}/course/${courseId}`,
          {
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        const updatedCourseData = await courseData.json()
        return updatedCourseData
      } catch (error) {
        showErrorToast('コースデータの取得に失敗しました')
      }
    }

    const getCompletionPercentage = () => {
      let totalVideos = 0
      let watchedVideos = 0

      courseData.sections.forEach((section) => {
        section.videos.forEach((video) => {
          totalVideos++
          if (
            video.ViewingStatus.some(
              (viewingStatus) =>
                viewingStatus.status === true &&
                viewingStatus.user_id === WrapperProps.userId,
            )
          ) {
            watchedVideos++
          }
        })
      })
      return totalVideos > 0 ? (watchedVideos / totalVideos) * 100 : 0
    }

    const handleViewingStatus = async () => {
      setIsWatchingLoading(true)

      const newWatchedStatus = !(watchedStatus?.[WrapperProps.videoId] || false)
      setWatchedStatus((prevStatus) => ({
        ...prevStatus,
        [WrapperProps.videoId]: newWatchedStatus,
      }))

      try {
        await upsertViewingStatus({
          isWatched: newWatchedStatus,
          userId,
          videoId,
        })
        setCheckedStatus((prevViewingStatus) => ({
          ...prevViewingStatus,
          [WrapperProps.videoId]: newWatchedStatus,
        }))

        const updatedCourseData = await getCourseData(WrapperProps.courseId)

        setCourseData(updatedCourseData)
      } catch (error) {
        showErrorToast(`${error}`)
      } finally {
        setIsWatchingLoading(false)
      }
    }

    const handleFavoriteVideoStatus = async () => {
      setIsFavoriteLoading(true)

      const newFavoritedStatus = !(
        favoritedStatus?.[WrapperProps.videoId] || false
      )
      setFavoritedStatus((prevFavoriteStatus) => ({
        ...prevFavoriteStatus,
        [WrapperProps.videoId]: newFavoritedStatus,
      }))

      try {
        await upsertFavoriteVideo({
          favoritedStatus: newFavoritedStatus,
          userId,
          videoId,
        })
      } catch (error) {
        showErrorToast(`${error}`)
      } finally {
        setIsFavoriteLoading(false)
      }
    }

    useEffect(() => {
      setCompletePercentage(getCompletionPercentage())
      setIsWatchingLoading(true)
      setIsFavoriteLoading(true)

      const fetchData = async () => {
        try {
          const buttonStatus = await fetchButtonStatus({ userId, videoId })
          setWatchedStatus(buttonStatus as { [key: string]: boolean })

          const checkMarkStatuses = await fetchCheckMarkStatuses({
            userId: WrapperProps.session?.user?.id,
            courseId: courseData.id,
          })
          setCheckedStatus(checkMarkStatuses)

          const favButtonStatus = await fetchFavButtonStatus({
            userId,
            videoId,
          })
          setFavoritedStatus(favButtonStatus as { [key: string]: boolean })
        } catch (error) {
          showErrorToast(`${error}`)
        } finally {
          setIsWatchingLoading(false)
          setIsFavoriteLoading(false)
        }
      }

      fetchData()
    }, [courseData, WrapperProps.session, WrapperProps.videoId])

    const getAnotherUserProfile = async (anotherUserId: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${anotherUserId}`,
          {
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const anotherUserProfileData = await response.json()
        setAnotherUserProfile(anotherUserProfileData)
        openProfileModal()
      } catch (error) {
        throw new error()
      }
    }

    let courseDetailProps = {
      session: WrapperProps.session,
      questions: WrapperProps.questions,
      answers: WrapperProps.answers,
      questionId: WrapperProps.questionId,
      courseData: courseData,
      completePercentage: completePercentage,
      watchedStatus: watchedStatus,
      checkedStatus: checkedStatus,
      favoritedStatus: favoritedStatus,
      isWatchingLoading: isWatchingLoading,
      isFavoriteLoading: isFavoriteLoading,
      handleViewingStatus: handleViewingStatus,
      handleFavoriteVideoStatus: handleFavoriteVideoStatus,
      getAnotherUserProfile: getAnotherUserProfile,
      anotherUserProfile: anotherUserProfile,
      isProfileOpen: isProfileOpen,
      closeProfileModal: closeProfileModal,
    }

    return <CourseDetail {...courseDetailProps} />
  } catch (e) {
    return <Error />
  }
}
