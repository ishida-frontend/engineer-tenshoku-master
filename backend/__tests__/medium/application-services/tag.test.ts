import { prismaMock } from '../../singleton'
import { TagApplicationService } from '../../../application/tag'
import crypto from 'crypto'

describe('TagApplicationService', () => {
  let tagService: TagApplicationService
  const tagId = crypto.randomUUID()

  beforeEach(() => {
    tagService = new TagApplicationService(prismaMock)
    prismaMock.tag.update.mockClear()
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

    await expect(tagService.createTag(tagParams)).rejects.toThrow(errorMessage)
  })

  test('タグが論理削除されること', async () => {
    const mockDeletedAt = new Date()

    prismaMock.tag.softDelete.mockImplementation(async () => {
      prismaMock.tag.findUnique.mockResolvedValueOnce({
        id: tagId,
        name: 'Example Tag',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: mockDeletedAt,
        color: 'blue',
        backgroundColor: 'yellow',
        courseId: null,
      })
      return
    })

    await tagService.deleteTag(tagId)

    const softDeletedTag = await prismaMock.tag.findUnique({
      where: { id: tagId },
    })

    expect(softDeletedTag?.deleted_at).toEqual(mockDeletedAt)
  })
})
