import { prismaMock } from "../../singleton"
import { AdvertisementApplicationService } from "../../../application/advertisement"

let advertisementService: AdvertisementApplicationService

beforeEach(() => {
  advertisementService = new AdvertisementApplicationService(prismaMock)
})

test('広告の新規作成が成功すること', async () => {
  const advertisementParams = {
    startFrom: '2024-01-01',
    endAt: '2030-01-01',
  }

  const expectedAdvertisement = {
    id: expect.any(String),
    name: expect.any(String),
    url: expect.any(String),
    author: expect.any(String),
    imageUrl: expect.any(String),
    cretated_at: expect.any(Date),
    updated_at: expect.any(Date),
    deleted_at: null,
    startFrom: '2024-01-01',
    endAt: '2030-01-01',
  }

  prismaMock.advertisement.mockResolvedValue(expectedAdvertisement)

  const createAdvertisement = await advertisementService.createAdvertisement(advertisementParams)
  expect(createAdvertisement).toEqual(expectedAdvertisement)
})

test('広告の新規作成に失敗した際にエラーが投げられること', async () => {
  const advertisementParams = {
    startFrom: '2024-01-01',
    endAt: '2030-01-01',
  }

  const errorMessage = '広告の新規作成に失敗しました'
  prismaMock.advertisement.create.mockRejectedValue(new Error(errorMessage))

  await expect(advertisementService.createAdvertisement(advertisementParams)).rejects.toThrow(errorMessage)
  })
