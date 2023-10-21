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
}

export type FavoriteVideoType = {
  id: string
  name: string
  image: string
  created_at: string
  sections: {
    id: string
    title: string
    order: number
    videos: {
      id: string
      name: string
      description: string
      order: number
      FavoriteVideo: {
        status: boolean
      }[]
    }[]
  }[]
}
