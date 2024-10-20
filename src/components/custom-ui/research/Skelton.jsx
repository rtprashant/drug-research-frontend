import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function Skelton() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className="w-[90%] h-[10vw] rounded-lg" />
      <Skeleton className="w-[80%] h-[20px] rounded-full" />


    </div>
  )
}

export default Skelton
