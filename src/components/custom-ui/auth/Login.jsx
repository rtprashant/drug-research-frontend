import React, { useState ,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import axios from 'axios'
import { loginFailed, loginStart, loginSuccess } from '../../../redux/features/auth/userSlice'
import { toast } from 'sonner'

function Login() {
  const { loading, error, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const [fromData, setFormData] = useState()
  const [loginViaUserName, setLoginViaUserName] = useState(false)
  const handleSubmitEvent = async (data) => {
    
    try {
      dispatch(loginStart())
      const res = await axios.post('http://localhost:5000/api/v1/users/login', data,
        {
          headers: {
            'Content-Type': 'application/json',
            },
            
            withCredentials: true
            
        }
      ) 
      if(res.data.success){
        navigate('/')
        dispatch(loginSuccess(res.data.data.user))
        toast.success('Login Successfull') 
      } 
    } catch (error) {
      dispatch(loginFailed(error.response?.data?.message || 'Something went wrong'))
      if(error.response){
        toast.error(error.response.data.data)
      }else{
        toast.error('Network error')
      }
      
    }
  }
  const handleLoginViaUserNameOrEmail = () => {
    setLoginViaUserName(!loginViaUserName)
    reset()

  }
  useEffect(
        ()=>{
            if(user){
                navigate('/')
            }
        },[user]
    )
  return (
    <div className=' w-[80%]   flex flex-col absolute '>
      <div className='text-[2vw] font-staatliches font-bold m-5 pt-10 '>Login</div>
      <div className='w-[95%] bg-white  shadow-2xl border-t-4 m-5 p-10 flex  rounded-xl'>
        <div className='w-[50%]'>
          <img src="https://static.vecteezy.com/system/resources/previews/006/405/794/non_2x/account-login-flat-illustration-vector.jpg" alt="image not found" />
        </div>
        <div className='w-[50%] '>
          <div className='ml- pt-20'>
            <div>
              <p className='text-gray-400 font-staatliches'>Start for free</p>
            </div>
            <div>
              <p className='text-black font-staatliches text-[2.5vw]'>Sign In to ProteinBind</p>
            </div>
          </div>
          <div className='mt-10 flex flex-col gap-5 '>
            <form onSubmit={handleSubmit(handleSubmitEvent)}
              className='flex flex-col gap-5'>
              {loginViaUserName ? (
                <div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='font-roboto text-black '>E-mail</label>

                    <input
                      type="text"

                      id="email"
                      className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] '
                      {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    />
                    {errors.email?.type === "required" && (
                      <p role="alert" className='text-red-800  text-[12px]'> * E-mail  is required</p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p role="alert" className='text-red-800  text-[12px]'> * Invalid E-mail</p>
                    )}
                    <p
                      onClick={handleLoginViaUserNameOrEmail}
                      className='text-blue-500  text-[12px]  transition ease-in-out duration-300 w-fit hover:cursor-pointer'>Use User Name insted</p>
                  </div>

                </div>
              ) : (
                <div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='font-roboto text-black '>User Name</label>

                    <input
                      type="text"
                      id="userName"
                      className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] '
                      {...register("userName", { required: true })}
                    />
                    {errors.userName?.type === "required" && (
                      <p role="alert" className='text-red-500  text-[12px]'> * User Name  is required</p>
                    )}
                    <p
                      onClick={handleLoginViaUserNameOrEmail}
                      className='text-blue-500  w-fit text-[12px] transition ease-in-out duration-300 hover:cursor-pointer'>Use E-mail insted</p>

                  </div>
                </div>
              )}

              <div className='flex flex-col gap-2'>
                <label htmlFor="password" className='font-roboto text-black '>Password</label>

                <input
                  type="password"
                  id="password"
                  className='font-roboto text-black  border border-black rounded-lg p-2 w-[90%] '
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * Password  is required</p>
                )}
              </div>
              <div>
                <p className='font-roboto text-black '>Choose Your Role</p>

                <div className='flex gap-2'>
                  <label htmlFor="admin">Admin</label>
                  <input
                    type="radio"
                    value="admin"
                    id='admin'
                    {...register("role", { required: true })} />
                  <label htmlFor="Researcher">Researcher</label>
                  <input
                    type="radio"
                    value="Researcher"
                    id='Researcher'
                    {...register("role", { required: true })} />

                </div>
                {errors.role?.type === "required" && (
                  <p role="alert" className='text-red-800  text-[12px]'> * Role  is required</p>
                )}
              </div>
              <button
                type='submit'
                disabled={loading}
                className={`border rounded-lg px-4 py-2 w-[20vw]   font-staatliches mt-5 ml-20 text-[20px] ${loading ? "bg-gray-400" : "bg-blue-500"}`}>{loading ? (
                  <div className='flex  ml-24'>
                    <p className='pt-2 '>Loging In...</p>
                    <LoaderCircle className='animate-spin mt-2' />
                  </div>
                ) : (
                  <p className='pt-2 mr-4'>Login In</p>
                )}</button>
            </form>
          </div>
          <div>
            <p className='font-roboto text-black ml-32'>Don't have an account? <Link to='/signup'
              className='text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out'>Sign Up</Link>
            </p>
            <p className='font-roboto text-black ml-36'>Forget Password? <Link to='/signup'
              className='text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out'>Reset</Link>
            </p>
          </div>
        </div>

      </div>



    </div>
  )
}

export default Login
