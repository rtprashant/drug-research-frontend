
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../../redux/features/auth/loginSlice';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ChnangeProfileImage() {

  const { loggedInUser } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const { handleSubmit , register } = useForm()
  const handleFileUpload = async(e)=>{
    const file = e.target.files[0]
    if(!file) return 
    const formData = new FormData()
    formData.append('profileImage' , file)
  try {
    const res = await axios.patch(`${apiUrl}/api/v1/users/changeProfileImage`, formData ,
      {
        headers :{
          "Content-Type" : 'multipart/form-data'
        },
        withCredentials : true
      }
    )
    dispatch(loginSuccess(res.data.data))
    
    
  } catch (error) {
    console.log(error);
    
  }
  }

  return (
    <div className='w-[50%] p-4 rounded-xl shadow-xl bg-white  flex flex-col gap-2 '>
      <h1 className='font-roboto font-bold'>
        Profile Image
        </h1>
        <div className='border border-black w-full'></div>
      <div className='mt-10'>
        <img src={loggedInUser ? loggedInUser.profileImage : "https://github.com/shadcn.png"} alt="" className='h-56 w-56 rounded-full  ml-40 ' />

      </div>
      
      <div className="w-full p-2 ">
        <input
          type="file"
          id="file-upload"
          className="hidden" 
          onChange={handleFileUpload}
        
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center justify-center  rounded-lg  text-blue-500"
        >
          Change Profile Image 
        </label>
      </div>
    

    </div>
  )
}

export default ChnangeProfileImage
