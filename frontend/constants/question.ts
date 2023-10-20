export const QUESTION_PAGES = {
  QuestionList: 'QuestionList',
  QuestionForm: 'QuestionForm',
  QuestionDetail: 'QuestionDetail',
} as const

export type QuestionPageType = keyof typeof QUESTION_PAGES
