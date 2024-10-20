import React from 'react'
import { useSelector } from 'react-redux'

function AiQueryBox() {
    const {prompt } = useSelector(state => state.aiResearch)

  return (
    <div className='rounded-xl bg-gray-100 p-2 w-fit'>
        {prompt}
      
    </div>
  )
}

export default AiQueryBox
