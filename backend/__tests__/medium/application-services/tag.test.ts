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

describe('広告の新規作成機能', () => {
  test('タグの新規作成が成功すること', async () => {
    const expectedTag = createExpectedTag()

    prismaMock.tag.create.mockResolvedValue(expectedTag)

    const createdTag = await tagService.createTag(tagParams)
    expect(createdTag).toEqual(expectedTag)
  })

  test('タグの新規作成に失敗した際にエラーが投げられること', async () => {
    const expectedError = 'エラーメッセージ'
    const errorMessage =
      'TagApplicationService: create tag error: エラーメッセージ'
    prismaMock.tag.create.mockRejectedValue(expectedError)

    expect.assertions(1)
    await expect(tagService.createTag(tagParams)).rejects.toThrow(errorMessage)
  })
})

describe('タグの更新機能', () => {
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
    const expectedError = 'エラーメッセージ'
    const errorMessage = `TagApplicationService: update tag error: エラーメッセージ`
    prismaMock.tag.update.mockRejectedValue(expectedError)

    expect.assertions(1)
    await expect(tagService.updateTag(updatedTagParams)).rejects.toThrow(
      errorMessage,
    )
  })
})

describe('指定されたtagIdのタグを取得する機能', () => {
  test('指定されたtagIdのタグが正しく取得されること', async () => {
    const expectedTag = createExpectedTag()

    prismaMock.tag.findUnique.mockResolvedValue(expectedTag)

    const fetchedTag = await tagService.getTag(tagId)
    expect(fetchedTag).toEqual(expectedTag)
  })

  test('指定されたタグの取得に失敗した際にエラーが投げられること', async () => {
    const expectedError = 'エラーメッセージ'
    const errorMessage = `TagApplicationService: get tag error: エラーメッセージ`
    prismaMock.tag.findUnique.mockRejectedValue(expectedError)

    expect.assertions(1)
    await expect(tagService.getTag('invalid_tag_id')).rejects.toThrow(
      errorMessage,
    )
  })
})

describe('削除されていないタグを全て取得する機能', () => {
  // TODO: DBに接続して実際にデータ作って判定する
  // Notion: https://www.notion.so/tag-DB-8bc308de82354239adf87e3a244ecdcc?pvs=4
  // test('削除されていないタグが取得されること', async () => {
  //   const activeTags = [
  //     createExpectedTag({ id: 'tag_id_1', name: 'Tag 1', color: 'red' }),
  //     createExpectedTag({ id: 'tag_id_2', name: 'Tag 2', color: 'blue' }),
  //     createExpectedTag({
  //       id: 'tag_id_3',
  //       name: 'Tag 3',
  //       color: 'green',
  //       deleted_at: new Date(),
  //     }),
  //   ]

  //   prismaMock.tag.findMany.mockResolvedValue(activeTags)

  //   const fetchedTags = await tagService.getTags()
  //   fetchedTags.forEach((tag) => {
  //     expect(tag.deleted_at).toBeNull()
  //   })
  // })

  test('タグの取得に失敗した際にエラーが投げられること', async () => {
    const expectedError = 'エラーメッセージ'
    const errorMessage = `TagApplicationService: get tags error: エラーメッセージ`

    prismaMock.tag.findMany.mockRejectedValue(expectedError)

    expect.assertions(1)
    await expect(tagService.getTags()).rejects.toThrow(errorMessage)
  })
})
