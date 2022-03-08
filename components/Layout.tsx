import React from 'react'
import Header from './Header'

type Props = {
  children:React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className='p-4 max-w-screen-lg mx-auto w-full'>
      {children}
      </div>
    </div>
  )
}

export default Layout