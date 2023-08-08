'use client'
import React, { useEffect, useState } from 'react'
import TextareaItem from './molecules/TextareaItem'
import FormItem from './molecules/FormItem'
import InputItem from './molecules/InputItem'

export function UserContactForm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    comment: '',
  })

  // お問い合わせ内容に関するonChangeハンドラ
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.persist()
    setState((prevState) => {
      return { ...prevState, comment: e.target.value }
    })
  }

  // お問い合わせタイトル、名前・メールアドレスに関するonChangeハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const target = e.target
    const name = target.name
    setState(() => {
      return { ...state, [name]: target.value }
    })
  }

  const fetcher = async () =>
    (
      await fetch('http://localhost:8000/contact/create', {
        method: 'POST',
        body: JSON.stringify({
          name: 'tanaka',
          email: 'tanaka@aaa.com',
          subject: '田中です',
          message: '田中と申します。',
          status: 0,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json()
  // const { data } = useSWR('contactContent', fetcher)
  // 送信ボタンを押下したら発火
  const submitAlert = async (e: React.MouseEvent) => {
    e.persist()
    e.preventDefault()
    const stateError = Object.values(state).some((value) => {
      return value.length === 0
    })

    // if (stateError) {
    //   alert('未入力項目があります')
    // } else {
    const res = await fetcher()
    // return mutate('/api/user', { ...data }, false)
    // alert('送信しました')
    // }
  }

  return (
    <>
      <h1>お問い合わせ</h1>
      <form>
        <div>
          <div>
            <FormItem title="お名前" required={true}></FormItem>
          </div>
          <div>
            <p>
              <InputItem
                name="name"
                value={state.name}
                onChange={handleInputChange}
              />
            </p>
          </div>
        </div>
        <hr></hr>

        <div>
          <div>
            <div>
              <FormItem title="メールアドレス" required={true}></FormItem>
            </div>
          </div>
          <p>
            <InputItem
              name="email"
              value={state.email}
              onChange={handleInputChange}
            />
          </p>
        </div>
        <hr></hr>

        <div>
          <div>
            <div>
              <FormItem title="お問い合わせタイトル" required={true}></FormItem>
            </div>
          </div>
          <p>
            <InputItem
              name="subject"
              value={state.subject}
              onChange={handleInputChange}
            />
          </p>
        </div>
        <hr></hr>

        <div>
          <div>
            <FormItem title="お問い合わせ内容" required={true}></FormItem>
          </div>
          <p>
            <TextareaItem
              name="お問い合わせ内容"
              value={state.comment}
              onChange={onChangeHandler}
            />
          </p>
        </div>
        <hr></hr>

        {/* <div>
        <div>
          <p>返信不要欄</p>
        </div>
        <div>
          <input type="checkbox" />
          <p>
            <span>利用規約およびプライバシーポリシーをご確認ください。</span>
          </p>
        </div>
      </div>  */}
      </form>
      <div>
        <button onClick={submitAlert}>送信</button>
      </div>
    </>
  )
}
