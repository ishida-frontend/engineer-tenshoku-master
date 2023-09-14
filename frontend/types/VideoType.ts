import { SectionType } from './SectionType'

export type VideoType = {
  id: number
  sections: SectionType[]
  sectionId: number
  order: number
  url: string
  name: string
  description: string
  published: boolean
  created_at: string
  updated_at: string
  deleted_at: string
}
