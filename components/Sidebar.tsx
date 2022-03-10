import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'

type Props = {}

type SidebarItems = {
  name:string
  href:string
}

const SIDEBAR_ITEMS:SidebarItems[] = [
  {name:"Dashboard",href:'/dashboard'},
  {name:"Explore",href:'/explore'},
  {name:"FAQs",href:'/faq'},
]
const Sidebar = (props: Props) => {
  const router:NextRouter = useRouter()

  return (
    <div className='relative bg-gray-900 h-full left-0  w-full p-4 max-w-[240px]'>
      <ul className=' flex flex-col gap-4 text-lg font-display'>
        {SIDEBAR_ITEMS.map((item)=>(
          <Link key={item.href} href={item.href}>
            <a className={'hover:bg-gray-800 px-4 py-2 rounded-xl duration-100 ease-out ' + (router.pathname == item.href && 'bg-gray-800 text-purple-300 ') }> 
            {item.name}
            </a>
            </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar