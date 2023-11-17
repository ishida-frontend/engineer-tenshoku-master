import Component from '../../../../components/admin/pages/CourseCreator'
import Error from '../../../error'

export default async function CreateCoursePage() {
  try {
    const tagsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const tags = await tagsRes.json()

    return <Component tags={tags} />
  } catch (e) {
    return <Error />
  }
}
