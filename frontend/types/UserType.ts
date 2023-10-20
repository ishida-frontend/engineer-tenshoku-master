import { USER_ROLE } from '../constants/user'

export type UserType = {
  id: string
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE]
  name: string
  oneWord: string
  goal: string
  createdAt: string
  updatedAt: string
}

export const QUESTION_PAGES = {
  QuestionList: 'QuestionList',
  QuestionForm: 'QuestionForm',
  QuestionDetail: 'QuestionDetail',
} as const // `as const`を使って、リテラル型を維持

export type QuestionPageType = keyof typeof QUESTION_PAGES
