import React from 'react'
import ChnageDetails from './ChnageDetails'
import ChnangeProfileImage from './ChnangeProfileImage'

function Setting() {
  return (
    <div className='p-10'>
      <h1 className='font-bold font-spaceGrotesk text-2xl'>Settings</h1>
      <div className='w-full flex justify-between mt-5 gap-2'>
     <ChnageDetails/>
     <ChnangeProfileImage/>
    </div>
    </div>
  )
}

export default Setting
