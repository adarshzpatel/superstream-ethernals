import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

type Props = {
  children:React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className='w-full flex h-full '>
        <Sidebar/>
        <div className='p-4 flex-1'>
      {children}
        </div>
      </div>
    </div>
  )
}

export default Layout