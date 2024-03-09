import { QUESTION_PAGES } from '../constants/index'

export type QuestionType = {
  id: string
  video_id: string
  user_id: string
  title: string
  content: string
  created_at: string
}

export type QuestionPageType = keyof typeof QUESTION_PAGES
export type CreateQuestionErrorType = { title: string; content: string }
