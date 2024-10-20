import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosSend } from "react-icons/io";

function DashboardChatBox() {
    const navigate = useNavigate()
    const handleDoubleClick = ()=>{
        navigate('/message')
    }
  return (
    <div className='w-[30vw] bg-white shadow-2xl rounded-xl p-10  h-[35vw]'
    onDoubleClick={handleDoubleClick}>
      <div>
        <h1 className='font-bold text-2xl'>Collaborate with team</h1>
      </div>
      <div className='flex mt-96 gap-2 absolute'>
      <div className=''>
        <input type="text" 
        placeholder='Type A Message...'
        className='border rounded-lg w-80 h-10 p-2 '/>
      </div>
      <div>
        <button className='border rounded-lg '><IoIosSend className='size-10 p-1'/></button>
      </div>
      </div>
    </div>
  )
}

export default DashboardChatBox
