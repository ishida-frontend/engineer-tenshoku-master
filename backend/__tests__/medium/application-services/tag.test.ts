import { prismaMock } from '../../singleton'
import { TagApplicationService } from '../../../application/tag'
import * as jest_mock_extended_1 from 'jest-mock-extended'

let tagService: TagApplicationService

beforeEach(() => {
  tagService = new TagApplicationService(prismaMock)
  jest_mock_extended_1.mockReset(prismaMock)
})

test('タグの新規作成が成功すること', async () => {
  const tagParams = {
    name: 'Node.js',
    color: 'white',
    backgroundColor: 'green',
  }

  const expectedTag = {
    id: expect.any(String),
    name: 'Node.js',
    color: 'white',
    backgroundColor: 'green',
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
    deleted_at: null,
    courseId: null,
  }

  prismaMock.tag.create.mockResolvedValue(expectedTag)

  const createdTag = await tagService.createTag(tagParams)
  expect(createdTag).toEqual(expectedTag)
})

test('タグの新規作成に失敗した際にエラーが投げられること', async () => {
  const tagParams = {
    name: 'Node.js',
    color: 'white',
    backgroundColor: 'green',
  }

  const errorMessage = 'タグの新規作成に失敗しました'
  prismaMock.tag.create.mockRejectedValue(new Error(errorMessage))
  console.log("aaaaaaaaaaaaaaa",exports.prismaMock)

  await expect(tagService.createTag(tagParams)).rejects.toThrow(errorMessage)
})
