import { TagType } from './TagType'

export type CourseType = {
  id: string
  name: string
  description: string
  image: string
  icon: string
  published: boolean
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CourseTagType = CourseType & {
  tags: TagType[]
}
