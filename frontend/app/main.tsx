import React from 'react'

import { Loader } from '../components/atoms/Loader'
import { Header } from './header'
import { Footer } from '../components/organisms/Footer'
import { AuthContext } from '../providers/AuthProvider'
import { useContext } from 'react'

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { check } = useContext(AuthContext)

  if (!check.checked) {
    return <Loader />
  }
  return (
    check.checked && (
      <>
        <Header isLogin={check.isAuthenticated} />
        {/* 全てのページログイン状態を参照可能にするロジック */}
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            isLogin: check.isAuthenticated,
          }),
        )}
        <Footer />
      </>
    )
  )
}
