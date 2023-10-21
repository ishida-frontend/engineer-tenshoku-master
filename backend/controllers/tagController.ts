import express from 'express'
import { TagApplicationService } from '../application/tag'

export class TagController {
  private tagApplicationService: TagApplicationService
  constructor() {
    this.tagApplicationService = new TagApplicationService()
  }
  async createTag(req: express.Request, res: express.Response) {
    try {
      const tagData = req.body
      await this.tagApplicationService.createTag(tagData)
      res.status(201).json({ message: '正常にタグを追加しました' })
    } catch (e: any) {
      res.status(500).json({ message: 'エラーが発生しました' })
    }
  }

  async getTag(req: express.Request, res: express.Response) {
    try {
      const tag = await this.tagApplicationService.getTag(req.params.id)
      res.status(200).json(tag)
    } catch (e: any) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました。' })
    }
  }
  async getTags(req: express.Request, res: express.Response) {
    try {
      const tags = await this.tagApplicationService.getTags()
      res.status(200).json(tags)
    } catch (e: any) {
      res.status(500).json({ message: 'サーバー内部のエラーが発生しました。' })
    }
  }

  // readFilteredTags = async function (
  //   req: express.Request,
  //   res: express.Response,
  // ) {
  //   try {
  //     const filteredTags = await readFilteredTags()
  //     res.status(200).json(filteredTags)
  //   } catch (e: any) {
  //     res.status(500).send('エラーが発生しました')
  //   }
  // }

  // updateTag = async function (req: express.Request, res: express.Response) {
  //   try {
  //     const { id, name, color } = req.body

  //     await updateTag({ id, name, color })
  //     res.status(201).json({ message: '正常に更新されました' })
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       return res.status(400).json({ error: error.issues[0].message })
  //     }
  //   }
  // }

  // deleteTag = async function (req: express.Request, res: express.Response) {
  //   try {
  //     const { id } = req.body

  //     await deleteTag(id)
  //     res.status(201).json({
  //       message: '正常に削除されました',
  //     })
  //   } catch (e: any) {
  //     res.status(500).json({ message: 'エラーが発生しました' })
  //   }
  // }
}
