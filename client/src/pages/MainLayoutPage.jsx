import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'

function MainLayoutPage({children,onLogout,isLogin}) {
  return (
    <div className="app-container flex overflow-hidden">
      <SideBar />
      <div className="main-content ml-[20%] w-[80%] pt-[8%] overflow-x-auto bg-[#F0F1F3] h-[100vh]">
        <Header onLogout={onLogout} isLogin={isLogin}
        />
        <div className="content p-3 ml-4 ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayoutPage