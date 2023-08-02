import { memo, FC } from 'react'
import { readAllContacts } from '../scripts/readContact'
import { ContactType } from '../types/index'
import { BrowserRouter, Link } from 'react-router-dom'

const ContactList: FC<ContactType> = memo((props) => {
  console.log('aaaaa')
  console.log('readAllContacts', readAllContacts)
  const arr = [...Array(readAllContacts)]
  console.log('arr', arr)
  const { name, email, subject, message, status } = props
  return (
    <BrowserRouter>
      <div>
        <Link to="/admin/contacts">お問い合わせ一覧</Link>
        <h1>お問い合わせ一覧</h1>
        <p>{`${name},${email},${subject},${message},${status}`}</p>
      </div>
    </BrowserRouter>
  )
})
