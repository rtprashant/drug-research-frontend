import React, { useEffect, useState } from 'react'
import Dashboard from '../dashboard/Dashboard'
import DashboardTopBox from '../dashboard/DashboardTopBox'
import { SiMoleculer } from "react-icons/si";
import { GiMicroscope } from "react-icons/gi";
import { MdMessage } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import MolecucleDetails from './MolecucleDetails';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import OtpBox from '../OtpBox';
import { loginSuccess } from '../../../redux/features/auth/loginSlice';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function AdminDashboard() {
  const { loggedInUser } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const [otpBox, setOtpBox] = useState(false)
  const topBox = [
    {
      id: 1,
      title: 'Molecule Bank',
      info: 'Get access to more molecules',
      path: '/moleculebank',
      icon: SiMoleculer
    },
    {
      id: 2,
      title: 'Generate Molecule',
      info: 'Get access to more molecules',
      path: '/genratemolecule',
      icon: FaBalanceScale

    },
    {
      id: 3,
      title: 'Search Compounds',
      info: 'Get access to more molecules',
      path: '/research',
      icon: GiMicroscope

    },
    {
      id: 4,
      title: 'Collaborative Research',
      info: 'Collaborate with team',
      path: '/message',
      icon: MdMessage

    },

  ]
  const handleOtpGenration = async () => {
    setOtpBox(!otpBox)
    try {
      const res = await axios.get(`${apiUrl}/api/v1/users/sendOtp`,
        {
          headers: {
            'Content-Type': 'application/json',

          },
          withCredentials: true
        }
      )
      toast.success(res.data.message)
     
      

    } catch (error) {
      toast.error("Failed To Send Otp")

    }


  }
  const handleOtpSubmit = async (e) => {
    const otp = e
    try {
      const res = await axios.post(`${apiUrl}/api/v1/users/emailVerification`, {
        otp
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      console.log(res.data.data);
      toast.success(res.data.message)
      dispatch(loginSuccess(res.data.data))
      setOtpBox(false)
      
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP")
    }

  }
  return (
    <div>
      {
        loggedInUser?.isEmailVerified ? "" : (
          <p className='bg-red-300 pl-10'>You have not verified your mail yet incase of forgot password you may lose your account <span>
            <button className='text-blue-500' onClick={handleOtpGenration}>
              verify now</button></span> </p>
        )
      }
      {
        otpBox && (
          <div className=' justify-center flex   '>
            <div className='w-96 p-5 h-64 rounded-lg z-50 bg-[#1C2434] absolute mt-32'>
              <button className='text-white  ml-[22vw] -mt-10  ' onClick={() => setOtpBox(!otpBox)}>
                X
              </button>
              <h5 className='font-bold font-spaceGrotesk text-white text-center'>
                A otp is sent to your regisetred mail id
              </h5>
              <div className='mt-8'>
                <OtpBox onSubmit={handleOtpSubmit} />
              </div>
            </div>
          </div>
        )
      }
      <div className='flex flex-col gap-5'>
        <div className='w-full p-10 flex justify-between '>
          {topBox.map((item) => (
            <div key={item.id}>
              <DashboardTopBox
                Icon={item.icon}
                heading={item.title}
                path={item.path}
                info={item.info} />
            </div>

          ))}
        </div>
        <MolecucleDetails />
      </div>
    </div>
  )
}

export default AdminDashboard
