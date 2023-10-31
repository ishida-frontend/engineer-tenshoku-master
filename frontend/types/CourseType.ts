import { TagType } from './TagType'
import { SectionType } from './SectionType'
import { CourseList } from '../components/organisms/CourseList'

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
  requiredTime: string
}

export type CourseTagType = CourseType & {
  tags: TagType[]
}
export type CourseWithSectionsType = CourseType & {
  sections: SectionType[]
}

export type CourseListType = CourseType & {
  tags: TagType[]
  sections: SectionType[]
}
