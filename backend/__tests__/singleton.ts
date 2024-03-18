import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import prisma from '../utils/prismaClient'

jest.mock('../utils/prismaClient', () => ({
  __esModule: true,
  default: mockDeep<typeof prisma>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<typeof prisma>
