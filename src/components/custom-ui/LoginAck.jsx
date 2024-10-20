import React from 'react'
import { Link } from 'react-router-dom'

function LoginAck() {
  return (
    <div className=''>
      <div className='w-[80%] h-[89%]  absolute -mt-56  backdrop-blur-sm  bg-opacity-50 ease-in-out duration-300 blur-md bg-[url("https://imgs.search.brave.com/wjHP4k3AvQHBo6fE0I8fboc-J4N2zlg5ix9xymIyUpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzczLzU4LzQx/LzM2MF9GXzc3MzU4/NDEzN19mTEd5em84/VFdORkRxRFVoeGVy/TTZKblYxbzR5Y3NW/Ti5qcGc")]'>



      </div>
      <div className=' w-[50%] rounded-lg shadow-lg p-10 flex flex-col border border-t-4 blur-none z-50 relative bg-white mx-[25%] mt-56 ' >
        <h1 className='text-xl  font-staatliches '>Can't Access This Resource</h1>
        <p className='font-sans'>Login First To Access</p>
        <button className='border h-fit w-fit px-4 rounded-md py-1 ml-[30vw] mt-5'>
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  )
}

export default LoginAck

