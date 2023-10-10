const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

export const PATHS = {
  LOGIN: {
    path: '/auth/login',
    title: 'ログイン',
  },
  REGISTER: {
    path: '/auth/register',
    title: '新規登録',
  },
  COURSE: {
    LIST: {
      path: '/course',
      title: 'コース一覧',
    },
  },
  CONTACT: {
    CREATE: {
      path: '/contact',
      title: 'お問い合わせ',
    },
    DONE: {
      path: '/contact/done',
      title: 'お問い合わせ完了',
    },
  },
  ADMIN: {
    COURSE: {
      LIST: {
        path: '/admin/course',
        title: 'コース一覧',
      },
      CREATE: {
        path: '/admin/course/create',
        title: 'コース作成',
      },
    },
  },
}

export const APIS = {
  VIEWING_STATUS: {
    UPSERT: {
      path: (userId: string | undefined, videoId: string) =>
        `${backendUrl}/viewingstatus/${userId}/${videoId}`,
      title: '視聴ステータスの作成と更新',
    },
    GET: {
      path: (userId: string | undefined) =>
        `${backendUrl}/viewingstatus/${userId}`,
      title: '視聴ステータスのフェッチ',
    },
  },
  FAVORITE_VIDEO: {
    UPSERT: {
      path: (userId: string | undefined, videoId: string) =>
        `${backendUrl}/favoritevideo/${userId}/${videoId}`,
      title: '動画のお気に入りステータスの作成と更新',
    },
    GET: {
      path: (userId: string | undefined, videoId: string) =>
        `${backendUrl}/favoritevideo/${userId}/${videoId}`,
      title: '動画のお気に入りステータスのフェッチ',
    },
  },
}

// TODO idなどを動的にするなら
// 参考 https://abeshi-blog.com/blog/t8or29ad3dz
