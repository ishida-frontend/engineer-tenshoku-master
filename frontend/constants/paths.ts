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

// TODO idなどを動的にするなら
// 参考 https://abeshi-blog.com/blog/t8or29ad3dz
