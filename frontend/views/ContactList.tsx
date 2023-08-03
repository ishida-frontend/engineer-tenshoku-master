import useSWR from 'swr'

export async function ContactList() {
  console.log('aaaaa')
  const fetcher = () => fetch('http://localhost:8000/admin/contacts')
  const data = await fetcher()
  return { props: { data } }

  function CheckContactList(props) {
    const initialData = props.data
    const { data, error } = useSWR('http://localhost:3000', fetcher, {
      initialData,
    })
    console.log('data', data)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
      <div>
        <p>お問い合わせ一覧</p>
        <p>{data}</p>
      </div>
    )
  }
}
