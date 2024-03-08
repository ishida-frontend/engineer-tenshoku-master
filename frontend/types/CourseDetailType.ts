import { Session } from 'next-auth'
import { CourseWithSectionsType } from './CourseType'
import {
  CreateQuestionErrorType,
  QuestionType,
  QuestionPageType,
} from './QuestionType'
import { AnswerType } from './AnswerType'
import { UserProfileType } from './index'
import { SelectedVideo } from '.././components/pages/CourseDetail'

export type WrapperPropsType = {
  courseId: string
  session: Session | null
  initialCourseData: CourseWithSectionsType
  userId: string
  videoId: string
  questions?: QuestionType[]
  answers: AnswerType[]
  questionId?: string
}

export type courseDetailPropsType = {
  courseData: CourseWithSectionsType
  session: Session | null
  completePercentage: number
  watchedStatus: Record<string, boolean>
  checkedStatus: Record<string, boolean>
  favoritedStatus: Record<string, boolean>
  isWatchingLoading: boolean
  isFavoriteLoading: boolean
  questions?: QuestionType[]
  answers: AnswerType[]
  questionId?: string
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleFavoriteVideoStatus: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  getAnotherUserProfile?: (value: string) => void
  anotherUserProfile?: UserProfileType
  isProfileOpen?: boolean
  closeProfileModal?: () => void
}

export type VideoSectionPropsType = {
  selectedVideo: SelectedVideo | null
  questionPage: QuestionPageType
  questions: QuestionType[] | undefined
  createQuestionErrors: CreateQuestionErrorType
  watchedStatus: { [videoId: string]: boolean }
  favoritedStatus: { [videoId: string]: boolean }
  isWatchingLoading: boolean
  isFavoriteLoading: boolean
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: QuestionPageType) => void
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleFavoriteVideoStatus: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  answers: AnswerType[]
  session: Session | null
  selectedQuestion?: QuestionType
  createAnswer: (createAnswerParams: { comment: string }) => Promise<void>
  getAnotherUserProfile?: (value: string) => void
  anotherUserProfile?: UserProfileType
  isProfileOpen?: boolean
  closeProfileModal?: () => void
}

export type VideoDetailAndQAndAPropsType = {
  selectedVideo: SelectedVideo | null
  questionPage: QuestionPageType
  questions?: QuestionType[]
  createQuestionErrors: CreateQuestionErrorType
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: QuestionPageType) => void
  answers: AnswerType[]
  session: Session | null
  selectedQuestion?: QuestionType
  createAnswer: (createAnswerParams: { comment: string }) => Promise<void>
  getAnotherUserProfile?: (value: string) => void
  anotherUserProfile?: UserProfileType
  isProfileOpen?: boolean
  closeProfileModal?: () => void
}
