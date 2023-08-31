export type SectionType = {
  course_id: string
  order: number
  title: string
  published: boolean
}

export type InitialSectionType = {
  id: number
  course_id: string
  order: number
  title: string
  published: boolean
}

export type SectionManageProps = {
  course_id: string
  initialSections: InitialSectionType[]
}
