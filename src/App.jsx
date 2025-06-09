import React from 'react'
import Navbar from './components/nav-sidebar/Navbar'
import SideBar from './components/nav-sidebar/SideBar'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'



const App = () => {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register />   */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      <div className=' left-0 md:relative flex flex-row md:w-full'>
        <div className="w-1/6">
          <SideBar />
        </div>
          <main className='w-5/6'>
            <Outlet />
          </main>
      </div>

    </div>
  )
}

export default App
