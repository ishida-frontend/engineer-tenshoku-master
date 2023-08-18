import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next'

// ページコンポーネントの引数の型定義
type StatusPageProps = { id: number }

// サーバーサイドでの前処理を行う関数
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<StatusPageProps>> => {
  // context経由でブラウザから送信されたパラメーターを受け取る
  const { id } = context.query

  // 受け取ったパラメーターが意図した型でなければnotfoundページとして処理する
  if (typeof id !== 'number') {
    return { notFound: true }
  }

  // 受け取ったパラメータに問題がなければStatusPagePropsを返す
  return { props: { id } }
}

const StatusPage: NextPage<StatusPageProps> = (props) => {
  return <p>このページのコースIDは{props.id}です</p>
}

export default StatusPage
