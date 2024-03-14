import { SectionType } from './SectionType'

export type VideoType = {
  id: string
  sections: SectionType[]
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
  FavoriteStatus: FavoriteVideoType[]
}

export type ViewingStatusType = {
  status: boolean
  user_id: string
  video_id: string
  created_at: string
  updated_at: string
}

export type FavoriteVideoType = {
  status: boolean
  user_id: string
  videos: VideoType[]
  created_at: string
  updated_at: string
}
