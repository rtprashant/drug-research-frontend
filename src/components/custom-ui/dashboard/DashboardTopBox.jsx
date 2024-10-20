import React from 'react'
import { CircleArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
function DashboardTopBox({Icon  , heading , info ,path}) {
    return (
        <div className='h-60 w-60 bg-white shadow-2xl rounded-xl relative p-7 flex flex-col gap-2'>
            <Icon size={40} />
            <h1 className='font-bold text-2xl'>{heading}</h1>
            <p className='-mt-2'>{info}</p>
            <Link to={path}> <CircleArrowRight className='size-8' /></Link> 
        </div>
    )
}

export default DashboardTopBox

