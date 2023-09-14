
import { VideoType } from './VideoType'

export type SectionType = {
  id: number
  course_id: string
  order: number
  title: string
  published: boolean
  videos: VideoType[]
}

export type InitialSectionType = {
  id: number
  course_id: string
  order: number
  title: string
  published: boolean
}

export type SectionManagePropsType = {
  course_id: string
  initialSections: InitialSectionType[]
}
