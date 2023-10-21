import { TagEditor } from '../../../../../components/admin/pages/TagEditor'

export default async function AdminEditCourse({
  params,
}: {
  params: { tagId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tag/${params.tagId}`,
    {
      cache: 'no-cache',
    },
  )
  const tag = await res.json()

  return <TagEditor tag={tag} />
}
