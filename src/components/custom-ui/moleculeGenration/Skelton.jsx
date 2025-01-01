import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function Skelton() {
    return (
        <div className='relative p-4 flex flex-col gap-5'>

            <div className='flex gap-1'>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />
                </div>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />
                </div>
            </div>
            <div className='flex gap-1'>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />

                </div>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />

                </div>
            </div>
            <div className='flex gap-1'>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />

                </div>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />

                </div>
            </div>
            <div className='flex gap-1'>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />

                </div>
                <div className='flex flex-col '>
                    <Skeleton className="w-[18vw] h-[10vw] rounded-lg " />

                </div>
            </div>

        </div>
    )
}

export default Skelton
