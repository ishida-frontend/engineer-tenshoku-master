export type QuestionType = {
  id: string
  video_id: string
  user_id: string
  title: string
  content: string
  created_at: string
}

export type CreateQuestionErrorType = { title: string; content: string }
