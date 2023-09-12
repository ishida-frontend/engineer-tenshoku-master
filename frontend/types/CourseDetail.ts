export type SelectedVideo = {
  id: number
  sections: {
    id: number
    order: number
    videos: {
      id: number
      order: number
      name: string
      url: string
    }
  }
}
