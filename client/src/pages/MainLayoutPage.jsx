import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'

function MainLayoutPage({children}) {
  return (
    <div className="app-container flex overflow-hidden">
      <SideBar />
      <div className="main-content ml-[20%] w-[80%] pt-[8%] overflow-x-auto">
        <Header />
        <div className="content p-3 ml-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayoutPage