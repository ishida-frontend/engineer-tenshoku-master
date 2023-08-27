export * from './CourseType'
export * from './VideoType'

export type { CourseType } from './CourseType'

export type ContactType = {
  name: string
  email: string
  subject: string
  message: string
  status: number
}
