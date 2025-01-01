import React, { useState , useEffect } from 'react'
import ChatMenu from './ChatMenu';
import { Outlet, useParams } from 'react-router-dom';
function Message() {
  return (
    <div className='flex'>
      <ChatMenu/>
      <div className='flex flex-col  ml w-[840px]'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Message
