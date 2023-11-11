import { CourseTagItemType } from './TagType'
import { SectionType } from './SectionType'

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
  tags: CourseTagItemType[]
}
export type CourseWithSectionsType = CourseType & {
  sections: SectionType[]
}

export type CourseListType = CourseType & {
  tags: CourseTagItemType[]
  sections: SectionType[]
}
