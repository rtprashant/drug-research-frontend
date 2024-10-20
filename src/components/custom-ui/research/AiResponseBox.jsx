import React from 'react'
import { useSelector } from 'react-redux'

function AiResponseBox() {
    const { response } = useSelector(state => state.aiResearch)
  return (
   <div>
    {response}
   </div>
  )
}

export default AiResponseBox
