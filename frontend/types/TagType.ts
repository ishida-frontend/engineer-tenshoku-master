export type TagType = {
  id: string
  name: string
  color: string
  backgroundColor: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CourseTagItemType = {
  course_id: string
  tag_id: string
  tag: TagType
}
