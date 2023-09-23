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
