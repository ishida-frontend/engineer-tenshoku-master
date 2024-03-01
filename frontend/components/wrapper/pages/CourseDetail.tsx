'use client'
import React, { useEffect, useState } from 'react'
import { Session } from 'next-auth'

import {
  upsertViewingStatus,
  fetchButtonStatus,
  fetchCheckMarkStatuses,
} from '../../../app/api/course/[courseId]/viewingStatus'
import {
  upsertFavoriteVideo,
  fetchFavButtonStatus,
} from '../../../app/api/course/[courseId]/favoriteVideo'
import { CourseWithSectionsType } from '../../../types/CourseType'
import { QuestionType } from '../../../types/QuestionType'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { AnswerType } from '../../../types/AnswerType'
import { CourseDetail } from '../../pages/CourseDetail'
import Error from '../../../app/error'
import { useDisclosure } from '@chakra-ui/react'
import { UserProfileType } from '../../../types'

export function CourseDetailWrapper({
  courseId,
  initialCourseData,
  session,
  userId,
  videoId,
  questions,
  answers,
  questionId,
}: {
  courseId: string
  session: Session | null
  initialCourseData: CourseWithSectionsType
  userId: string
  videoId: string
  questions?: QuestionType[]
  answers: AnswerType[]
  questionId?: string
  goodCount?: number
}) {
  const { showErrorToast } = useCustomToast()

  try {
    const [courseData, setCourseData] = useState(initialCourseData)
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

    const [isLiked, setIsLiked] = useState(false)
    const [, setGoodCount] = useState(0)

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
                viewingStatus.user_id === userId,
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

      const newWatchedStatus = !(watchedStatus?.[videoId] || false)
      setWatchedStatus((prevStatus) => ({
        ...prevStatus,
        [videoId]: newWatchedStatus,
      }))

      try {
        await upsertViewingStatus({
          isWatched: newWatchedStatus,
          userId,
          videoId,
        })
        setCheckedStatus((prevViewingStatus) => ({
          ...prevViewingStatus,
          [videoId]: newWatchedStatus,
        }))

        const updatedCourseData = await getCourseData(courseId)

        setCourseData(updatedCourseData)
      } catch (error) {
        showErrorToast(`${error}`)
      } finally {
        setIsWatchingLoading(false)
      }
    }

    const handleFavoriteVideoStatus = async () => {
      setIsFavoriteLoading(true)

      const newFavoritedStatus = !(favoritedStatus?.[videoId] || false)
      setFavoritedStatus((prevFavoriteStatus) => ({
        ...prevFavoriteStatus,
        [videoId]: newFavoritedStatus,
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

    const handleLike = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/goodVideo/${videoId}/count`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              videoId,
            }),
          },
        )

        setIsLiked(!isLiked)
        setGoodCount((count) => (isLiked ? count - 1 : count + 1))
      } catch (error) {
        console.error('Error toggling like:', error)
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
            userId: session?.user?.id,
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
    }, [courseData, session, videoId])

    useEffect(() => {
      const handleLikeStatus = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/goodVideo/${videoId}`,
          )
          const data = await res.json()
          setIsLiked(data.liked)
        } catch (error) {
          console.error('Error:', error)
        }
      }

      handleLikeStatus()
    }, [videoId, userId])

    const fetchGoodCount = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/goodVideo/${videoId}`,
        )
        const data = await res.json()
        setGoodCount(data.goodCount)
      } catch (error) {
        console.error('Error goodCount:', error)
      }
    }
    // コンポーネントが初めてマウントされたときに一度だけ goodCount を取得
    // （例えば、いいねボタンの初期表示の際に実行される）
    fetchGoodCount()

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

    return (
      <CourseDetail
        courseData={courseData}
        session={session}
        completePercentage={completePercentage}
        watchedStatus={watchedStatus}
        checkedStatus={checkedStatus}
        favoritedStatus={favoritedStatus}
        isWatchingLoading={isWatchingLoading}
        isFavoriteLoading={isFavoriteLoading}
        questions={questions}
        answers={answers}
        questionId={questionId}
        handleViewingStatus={handleViewingStatus}
        handleFavoriteVideoStatus={handleFavoriteVideoStatus}
        getAnotherUserProfile={getAnotherUserProfile}
        anotherUserProfile={anotherUserProfile}
        isProfileOpen={isProfileOpen}
        closeProfileModal={closeProfileModal}
        handleLike={handleLike}
      />
    )
  } catch (e) {
    return <Error />
  }
}
