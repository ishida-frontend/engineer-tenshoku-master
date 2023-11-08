import { QUESTION_PAGES, USER_ROLE } from '../constants'

export type UserType = {
  id: string
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE]
  name: string
  oneWord: string
  goal: string
  github?: string
  x?: string
  createdAt: string
  updatedAt: string
}

export type QuestionPageType = keyof typeof QUESTION_PAGES
export type UserProfileType = {
  id: string
  name: string
  oneWord: string
  goal: string
  github?: string
  x?: string
}

export type UserProfileErrorType = {
  nameError: string
  oneWordError: string
  goalError: string
  githubError: string
  xError: string
}
