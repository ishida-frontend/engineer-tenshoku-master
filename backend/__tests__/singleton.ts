import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma, { PrismaClient } from '../utils/prismaClient'
import { Tag } from '@prisma/client'

jest.mock('../utils/prismaClient', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>({
    tag: mockDeep<Tag>(),
  }),
}))

beforeEach(() => {
  mockReset(prisma)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
export const prismaTagMock = prisma.tag as unknown as DeepMockProxy<Tag>
