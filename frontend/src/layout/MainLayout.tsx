import React from 'react'
import TopNav from '../components/TopNav'
import SideNav from '../components/SideNav'
import { useLocation } from 'react-router-dom'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <>
      <header>
        <TopNav />
      </header>
      <div className={[location.pathname == "/" ? "max-w[1140px" : "", "flex justify-between mx-auto w-full lg:px-2.5 px-0",].join("")}>
        <div>
          <SideNav />
        </div>
        {children}
      </div>

    </>
  )
}
