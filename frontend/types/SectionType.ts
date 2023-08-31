import { VideoType } from './VideoType'

export type SectionType = {
  id: number
  courseId: number
  order: number
  title: string
  published: boolean
  videos: VideoType[]
}
