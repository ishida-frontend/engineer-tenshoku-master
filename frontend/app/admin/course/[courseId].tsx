import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const CoursePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>このページのIDは{id}です</p>
}

export default CoursePage
