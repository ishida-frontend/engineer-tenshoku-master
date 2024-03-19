import { CourseType } from './CourseType'
import { VideoType } from './VideoType'

export type SectionType = {
  id: string
  course_id: string
  course: CourseType
  order: number
  title: string
  published: boolean
  videos: VideoType[]
}
