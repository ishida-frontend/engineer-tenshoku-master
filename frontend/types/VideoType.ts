import { SectionType } from './SectionType'

export type VideoType = {
  id: string
  section: SectionType
  sectionId: string
  order: number
  url: string
  name: string
  description: string
  published: boolean
  created_at: string
  updated_at: string
  deleted_at: string
  ViewingStatus: ViewingStatusType[]
}

export type ViewingStatusType = {
  status: boolean
  user_id: string
  video_id: string
  created_at: string
  updated_at: string
}

export type FavoriteVideoType = {
  created_at: string
  deleted_at: string
  status: boolean
  updated_at: string
  user_id: string
  video: VideoType
  video_id: string
}
