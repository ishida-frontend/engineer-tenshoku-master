import { prismaMock } from '../../singleton'
import { AdvertisementApplicationService } from '../../../application/advertisement'

let advertisementService: AdvertisementApplicationService

const advertisementId = 'advertisement_id_1'

const advertisementParams = {
  name: 'Sample Advertisement',
  url: 'https://example.com',
  imageUrl: 'https://example.com/image.jpg',
  author: 'Tanaka Taro',
  startFrom: expect.any(Date),
  endAt: expect.any(Date),
}

const updatedAdvertisementParams = {
  id: advertisementId,
  ...advertisementParams,
}

function createExpectedAdvertisement(overrides = {}) {
  return {
    id: advertisementId,
    ...advertisementParams,
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
    deleted_at: null,
    ...overrides,
  }
}

beforeEach(() => {
  advertisementService = new AdvertisementApplicationService(prismaMock)
})

afterEach(() => {
  jest.clearAllMocks()
})

test('広告の新規作成が成功すること', async () => {
  const expectedAdvertisement = createExpectedAdvertisement()

  prismaMock.advertisement.create.mockResolvedValue(expectedAdvertisement)

  const createdAdvertisement =
    await advertisementService.createAdvertisement(advertisementParams)
  expect(createdAdvertisement).toEqual(expectedAdvertisement)
})

test('広告の新規作成に失敗した際にエラーが投げられること', async () => {
  const errorMessage = '広告の新規作成に失敗しました'
  prismaMock.advertisement.create.mockRejectedValue(new Error(errorMessage))

  await expect(
    advertisementService.createAdvertisement(advertisementParams),
  ).rejects.toThrow(errorMessage)
})

test('広告情報の更新が成功すること', async () => {
  const expectedUpdatedAdvertisement = createExpectedAdvertisement({
    name: advertisementParams.name,
    url: advertisementParams.url,
    imageUrl: advertisementParams.imageUrl,
    author: advertisementParams.author,
    updated_at: new Date(),
    startFrom: advertisementParams.startFrom,
    endAt: advertisementParams.endAt,
  })

  prismaMock.advertisement.update.mockResolvedValue(
    expectedUpdatedAdvertisement,
  )

  const updatedAdvertisement = await advertisementService.updateAdvertisement(
    updatedAdvertisementParams,
  )
  expect(updatedAdvertisement).toEqual(expectedUpdatedAdvertisement)
})

test('広告の更新が失敗した際にエラーが投げられること', async () => {
  const errorMessage = '広告の更新に失敗しました'
  prismaMock.advertisement.update.mockRejectedValue(new Error(errorMessage))

  await expect(
    advertisementService.updateAdvertisement(updatedAdvertisementParams),
  ).rejects.toThrow(errorMessage)
})

test('指定されたidの広告が正しく取得されること', async () => {
  const expectedAdvertisement = createExpectedAdvertisement()

  prismaMock.advertisement.findUnique.mockResolvedValue(expectedAdvertisement)

  const fetchedAdvertisement =
    await advertisementService.getAdvertisement(advertisementId)

  expect(fetchedAdvertisement).toEqual(expectedAdvertisement)
})

test('指定された広告の取得に失敗した際にエラーが投げられること', async () => {
  const errorMessage = '広告の取得に失敗しました'
  prismaMock.advertisement.findUnique.mockRejectedValue(new Error(errorMessage))

  await expect(
    advertisementService.getAdvertisement('invalid_advertisement_id'),
  ).rejects.toThrow(errorMessage)
})

test('削除されていない広告が取得されること', async () => {
  const activeAdvertisements = [
    createExpectedAdvertisement({
      id: 'advertisement_id_1',
    }),
    createExpectedAdvertisement({
      id: 'advertisement_id_2',
    }),
    createExpectedAdvertisement({
      id: 'advertisement_id_3',
    }),
  ]

  prismaMock.advertisement.findMany.mockResolvedValue(activeAdvertisements)

  const fetchedAdvertisements = await advertisementService.getAdvertisements()
  fetchedAdvertisements.forEach((advertisement) => {
    expect(advertisement.deleted_at).toBeNull()
  })
})

test('削除されていない広告が取得されない場合、エラーが投げられること', async () => {
  prismaMock.advertisement.findMany.mockResolvedValue([])

  await expect(advertisementService.getAdvertisements()).resolves.toEqual([])
})

test('広告の削除が成功し、deleted_at に日付が含まれること', async () => {
  const deletedAt = expect.any(Date)

  prismaMock.advertisement.update.mockResolvedValue({
    ...createExpectedAdvertisement({ id: advertisementId }),
    deleted_at: deletedAt,
  })

  const deletedAdvertisement =
    await advertisementService.deleteAdvertisement(advertisementId)
  expect(deletedAdvertisement.deleted_at).toEqual(deletedAt)
})

test('広告の削除が失敗し、エラーが投げられること', async () => {
  const errorMessage = '広告の削除に失敗しました'

  prismaMock.advertisement.update.mockRejectedValue(new Error(errorMessage))

  await expect(
    advertisementService.deleteAdvertisement(advertisementId),
  ).rejects.toThrow(errorMessage)
})
