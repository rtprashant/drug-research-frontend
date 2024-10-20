import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Navbar from './components/custom-ui/Navbar'
import SideBar from './components/custom-ui/SideBar'
import Signup from './components/custom-ui/auth/Signup'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <div className='bg-[#F1F5F9]  '>
      <div className='flex w-full'>
       <SideBar /> 
        <div className='w-full ml-[20%]'>
          <Navbar />
          <Outlet/>
          

        </div>
      </div>
    </div>
  )
}

export default App
