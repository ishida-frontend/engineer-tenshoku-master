export type QuestionType = {
  id: string
  video_id: string
  user_id: string
  title: string
  content: string
  created_at: string
}

const QUESTION_PAGES = {
  QuestionList: 'QuestionList',
  QuestionForm: 'QuestionForm',
  QuestionDetail: 'QuestionDetail',
} as const

export type QuestionPageType = keyof typeof QUESTION_PAGES

export type CreateQuestionErrorType = { title: string; content: string }
