import { VideoType } from './VideoType'

export type SectionType = {
  id: string
  course_id: string
  order: number
  title: string
  published: boolean
  videos: VideoType[]
}
