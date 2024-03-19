import { prismaMock } from '../../singleton'
import { TagApplicationService } from '../../../application/tag'

let tagService: TagApplicationService

const tagId = 'tag_id_1'

const tagParams = {
  name: 'Node.js',
  color: 'white',
  backgroundColor: 'green',
}

const updatedTagParams = {
  id: tagId,
  name: 'React.js',
  color: 'blue',
  backgroundColor: 'black',
}

function createExpectedTag(overrides = {}) {
  return {
    id: tagId,
    name: 'Node.js',
    color: 'white',
    backgroundColor: 'green',
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
    deleted_at: null,
    courseId: null,
    ...overrides,
  }
}

beforeEach(() => {
  tagService = new TagApplicationService(prismaMock)
})

test('タグの新規作成が成功すること', async () => {
  const expectedTag = createExpectedTag()

  prismaMock.tag.create.mockResolvedValue(expectedTag)

  const createdTag = await tagService.createTag(tagParams)
  expect(createdTag).toEqual(expectedTag)
})

test('タグの新規作成に失敗した際にエラーが投げられること', async () => {
  const errorMessage = 'タグの新規作成に失敗しました'
  prismaMock.tag.create.mockRejectedValue(new Error(errorMessage))

  await expect(tagService.createTag(tagParams)).rejects.toThrow(errorMessage)
})

test('タグの更新が成功すること', async () => {
  const expectedUpdatedTag = createExpectedTag({
    name: updatedTagParams.name,
    color: updatedTagParams.color,
    backgroundColor: updatedTagParams.backgroundColor,
    updated_at: new Date(),
  })

  prismaMock.tag.update.mockResolvedValue(expectedUpdatedTag)

  const updatedTag = await tagService.updateTag(updatedTagParams)
  expect(updatedTag).toEqual(expectedUpdatedTag)
})

test('タグの更新が失敗した際にエラーが投げられること', async () => {
  const errorMessage = 'タグの更新に失敗しました'
  prismaMock.tag.update.mockRejectedValue(new Error(errorMessage))

  await expect(tagService.updateTag(updatedTagParams)).rejects.toThrow(
    errorMessage,
  )
})

test('指定されたtagIdのタグが正しく取得されること', async () => {
  const expectedTag = createExpectedTag()

  prismaMock.tag.findUnique.mockResolvedValue(expectedTag)

  const fetchedTag = await tagService.getTag(tagId)
  expect(fetchedTag).toEqual(expectedTag)
})

test('指定されたタグの取得に失敗した際にエラーが投げられること', async () => {
  const errorMessage = 'タグの取得に失敗しました'
  prismaMock.tag.findUnique.mockRejectedValue(new Error(errorMessage))

  await expect(tagService.getTag('invalid_tag_id')).rejects.toThrow(
    errorMessage,
  )
})

test('削除されていないタグが取得されること', async () => {
  const activeTags = [
    createExpectedTag({ id: 'tag_id_1', name: 'Tag 1', color: 'red' }),
    createExpectedTag({ id: 'tag_id_2', name: 'Tag 2', color: 'blue' }),
    createExpectedTag({ id: 'tag_id_3', name: 'Tag 3', color: 'green' }),
  ]

  prismaMock.tag.findMany.mockResolvedValue(activeTags)

  const fetchedTags = await tagService.getTags()
  fetchedTags.forEach((tag) => {
    expect(tag.deleted_at).toBeNull()
  })
})

test('削除されていないタグが取得されない場合、エラーが投げられること', async () => {
  prismaMock.tag.findMany.mockResolvedValue([])

  await expect(tagService.getTags()).resolves.toEqual([])
})
