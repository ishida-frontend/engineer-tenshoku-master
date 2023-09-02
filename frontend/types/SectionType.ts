import { VideoType } from './VideoType'

export type SectionType = {
  id: number
  courseId: string
  order: number
  title: string
  published: boolean
  videos: VideoType[]
}
