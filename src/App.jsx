import { useState, useEffect , useRef } from 'react' 
import Navbar from './components/custom-ui/Navbar'
import SideBar from './components/custom-ui/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './redux/features/auth/loginSlice'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(
    () => {
      const user = async () => {
        try {
          const res = await axios.get(`${apiUrl}/api/v1/users/getUser`, {
            withCredentials: true
          })
        }

        catch (error) {
          console.log(error)
          dispatch(logoutUser())
          navigate('/login')

        }

      }
      user()
      const intervel = setInterval(user, 60000*60*12)
      return () => clearInterval(intervel)
    }, [navigate, dispatch , apiUrl ]
  )
 
 
 
  return (
    <div className='bg-[#F1F5F9]  '>
      <div className='flex w-full'>
        <SideBar />
        <div className='w-full ml-[20%]'>
          <Navbar />
          <Outlet />


        </div>
      </div>
    </div>
  )
}

export default App
