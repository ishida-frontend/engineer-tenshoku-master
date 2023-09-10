export type CourseType = {
  id: number
  name: string
  description: string
  image: string
  published: boolean
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CourseDetailPropsType = {
  id: number
  name: string
  description: string
  image: string
  published: boolean
  created_at: string
  updated_at: string
  deleted_at: string
  sections: [
    {
      id: number
      course_id: string
      order: number
      title: string
      published: boolean
      created_at: string
      updated_at: string
      deleted_at: string
      videos: [
        {
          id: number
          sectionId: string
          order: number
          name: string
          description: string
          url: string
          published: boolean
          created_at: string
          updated_at: string
          deleted_at: string
        },
      ]
    },
  ]
}
