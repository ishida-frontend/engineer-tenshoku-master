import { NextResponse } from 'next/server'
import { checkToken } from '../../auth'

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: {
      courseId: string
    }
  },
) {
  const { courseId } = params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const resData = await res.json()
  return NextResponse.json(resData)
}
