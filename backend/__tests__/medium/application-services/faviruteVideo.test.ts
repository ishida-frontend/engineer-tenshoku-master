import { prismaMock } from '../../singleton'
import { FavoriteVideoApplicationService } from '../../../application/favoriteVideo'

let favoriteVideoService: FavoriteVideoApplicationService

beforeEach(() => {
  favoriteVideoService = new FavoriteVideoApplicationService(prismaMock)
})

afterEach(() => {
  jest.clearAllMocks()
})

const userId = 'user_id_1'
const videoId = 'video_id_1'
const expectedDate = expect.any(Date)

const expectedFavoriteVideo = {
  status: true,
  user_id: userId,
  video_id: videoId,
  created_at: expectedDate,
  updated_at: expectedDate,
  deleted_at: null,
}

const expectedStatus = {
  status: true,
  user_id: userId,
  video_id: videoId,
  created_at: expectedDate,
  updated_at: expectedDate,
  deleted_at: null,
}

const expectedFavoriteVideos = [
  {
    ...expectedFavoriteVideo,
    video: {
      section: {
        course: {},
      },
    },
  },
]

test('動画のお気に入りステータスの設定が成功すること', async () => {
  prismaMock.favoriteVideo.upsert.mockResolvedValue(expectedFavoriteVideo)

  const newStatus = await favoriteVideoService.upsert({
    favoritedStatus: true,
    userId,
    videoId,
  })
  expect(newStatus).toEqual(expectedFavoriteVideo)
})

test('動画のお気に入りステータスの設定に失敗した際にエラーが投げられること', async () => {
  const errorMessage = '動画のお気に入りステータスの設定に失敗しました'
  prismaMock.favoriteVideo.upsert.mockRejectedValue(new Error(errorMessage))

  await expect(
    favoriteVideoService.upsert({
      favoritedStatus: true,
      userId,
      videoId,
    }),
  ).rejects.toThrow(errorMessage)
})

test('指定された動画のお気に入りステータスが取得されること', async () => {
  prismaMock.favoriteVideo.findUnique.mockResolvedValue(expectedStatus)

  const fetchedStatus = await favoriteVideoService.get({ userId, videoId })
  expect(fetchedStatus).toEqual(expectedStatus)
})
test('指定された動画のお気に入りステータスの取得が失敗し、エラーメッセージが投げられること', async () => {
  const errorMessage = '動画のお気に入りステータスの取得に失敗しました'

  prismaMock.favoriteVideo.findUnique.mockRejectedValue(new Error(errorMessage))

  await expect(favoriteVideoService.get({ userId, videoId })).rejects.toThrow(
    errorMessage,
  )
})

test('指定されたユーザーの全てのお気に入り動画が取得されること', async () => {
  prismaMock.favoriteVideo.findMany.mockResolvedValue(expectedFavoriteVideos)

  const favoriteVideos = await favoriteVideoService.getFavoriteVideos()
  expect(favoriteVideos).toEqual(expectedFavoriteVideos)
})

test('指定されたユーザーのお気に入り動画の取得が失敗し、エラーメッセージが投げられること', async () => {
  const errorMessage = 'お気に入り動画の取得に失敗しました'

  prismaMock.favoriteVideo.findMany.mockRejectedValue(new Error(errorMessage))

  await expect(favoriteVideoService.getFavoriteVideos()).rejects.toThrow(
    errorMessage,
  )
})
