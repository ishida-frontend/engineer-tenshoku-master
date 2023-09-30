export type UserType = {
  id: string
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE]
  name: string
  oneWord: string
  goal: string
  createdAt: string
  updatedAt: string
}
