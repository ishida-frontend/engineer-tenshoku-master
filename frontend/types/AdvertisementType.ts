export type AdvertisementType = {
  id: string
  name: string
  url: string
  imageUrl: string
  author: string
  isShow: boolean
  startFrom: Date
  endAt: Date
}

export type AdvertisementErrorType = {
  nameError: string
  urlError: string
  authorError: string
  startFromError: Date
  endAtError: Date
}
