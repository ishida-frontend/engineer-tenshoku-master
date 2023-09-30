import { ViewingStatusRepository } from '../repositories/viewingStatusRepository'

export const fetchViewingStatus = (userId: string, videoId: string) => {
  return ViewingStatusRepository.getStatusByUserAndVideo(userId, videoId)
}

export const updateViewingStatus = ({
  userId,
  videoId,
  newStatus,
}: {
  userId: string
  videoId: string
  newStatus: string
}) => {
  return ViewingStatusRepository.updateStatusByUserAndVideo({
    userId,
    videoId,
    newStatus,
  })
}
