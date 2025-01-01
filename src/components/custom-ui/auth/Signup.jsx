import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import img from '../dna.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerFailed, registerStart, registerSuccess , afterRegisterSuceess } from '../../../redux/features/auth/signupSlice'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_BACKEND_URL;
function Signup() {
    const { signupUser,
        signupLoading,
        singupError} = useSelector(state => state.signup)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm()
const handleSubmitEvent = async (data) =>{

        if (data.confirmPassword !== data.password) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match"
            })
            return;
        } else {
            clearErrors("confirmPassword")
        }

        try {
            dispatch(registerStart());
            const formData = new FormData()
            const filedToAppend = ['fullName', 'userName', 'email', 'password', 'bio', 'role']
            filedToAppend.forEach((filed) => {
                formData.append(filed, data[filed])
            })
            if (data.profileImage) {
                formData.append('profileImage', data.profileImage[0])
            }
            const response = await axios.post(`${apiUrl}/api/v1/users/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
          
            if (response.data.success) {
                const profileImage  = response.data.data.profileImage
                
                
                const userData = {
                    fullName: data.fullName,
                    userName: data.userName,
                    email: data.email,
                    bio: data.bio,
                    role: data.role,
                    profileImage: profileImage,  
                };
                dispatch(registerSuccess(userData))
                navigate('/login',{ replace: true })
                toast.success(response.data.message)
                reset()
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.data)
            dispatch(registerFailed(error.message || 'User registration failed'));
        }

    }
   

    return (
        <div className=' w-[80%]   flex flex-col absolute'>
            <div className='text-[2vw] font-staatliches font-bold m-5 pt-10 '>Sign up</div>
            <div className='w-[95%] bg-white  shadow-2xl border-t-4 m-5 flex rounded-xl'>
                <div className='w-[50%] flex flex-col mt-56'>
                    <div className='flex gap-5 ml-40'>
                        <div>
                            <img className='bg-blue-800 rounded-sm' src={img} alt="" />
                        </div>
                        <div>
                            <p className='font-spaceGrotesk font-bold text-[2vw]'>ProteinBind</p>
                        </div>
                    </div>
                    <div >
                        <img className="ml-32 mt-20 scale-150" src="https://t3.ftcdn.net/jpg/04/36/53/72/240_F_436537240_Z8Y9cQFXn4CUyazCnYharA3d7fmqdrp2.jpg" alt="" />
                    </div>
                </div>
                <div className='w-[50%] p-10 flex flex-col '>
                    <div>
                        <p className='text-gray-400 font-staatliches'>Start for free</p>
                    </div>
                    <div>
                        <p className='text-black font-staatliches text-[2.5vw]'>Sign Up to ProteinBind</p>
                    </div>
                    <div className=''>
                        <form onSubmit={handleSubmit(handleSubmitEvent)}>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <label htmlFor="fullName" className='font-roboto text-black '>Enter Your Fullname</label>
                                    <input
                                        {...register("fullName", { required: true, })}
                                        type="text"
                                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                        id='fullName'

                                    />
                                    {errors.fullName?.type === "required" && (
                                        <p role="alert" className='text-red-800  text-[12px]'> * Name  is required</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="userName" className='font-roboto text-black '>Enter Your Username</label>
                                    <input
                                        {...register("userName", { required: true, })}
                                        type="text"
                                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                        id='userName'

                                    />
                                    {errors.userName?.type === "required" && (
                                        <p role="alert" className='text-red-800  text-[12px]'> * User Name  is required</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className='font-roboto text-black '>Enter Your E-mail</label>
                                    <input
                                        {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                                        type="text"
                                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                        id='email'

                                    />
                                    {errors.email?.type === "required" && (
                                        <p role="alert" className='text-red-800  text-[12px]'> * Email  is required</p>
                                    )}
                                    {errors.email?.type === "pattern" && (
                                        <p role="alert" className='text-red-800  text-[12px]'> * Invalid Email </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className='font-roboto text-black '>Enter Your Password</label>
                                    <input
                                        {...register("password", { required: true, })}
                                        type="password"
                                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                        id='password'

                                    />
                                    {errors.password?.type === "required" && (
                                        <p role="alert" className='text-red-800  text-[12px]'> * Password  is required</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className='font-roboto text-black '>Confirm Your Password</label>
                                    <input
                                        {...register("confirmPassword", { required: true, })}
                                        type="password"
                                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                        id='confirmPassword'

                                    />
                                    {errors.confirmPassword && (
                                        <p role="alert" className='text-red-800 text-[12px]'>
                                            {errors.confirmPassword.message || "* Password confirmation is required"}
                                        </p>
                                    )}

                                </div>
                                <div>
                                    <label htmlFor="bio" className='font-roboto text-black '>Bio</label>
                                    <input
                                        {...register("bio")}
                                        type="text"
                                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                        id='bio'

                                    />
                                </div>
                                <div>
                                    <label htmlFor="img" className='font-roboto text-black '>Profile Image</label>
                                    <input
                                        {...register("profileImage", {
                                            required: true,
                                            validate: {
                                                acceptedFormat: (fileList) => {
                                                    const file = fileList[0];
                                                    const acceptedFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
                                                    return file && acceptedFormats.includes(file.type) || " * Only JPG, PNG, and JPEG are allowed";
                                                }
                                            }
                                        })}
                                        type="file"
                                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                        id='img'
                                        accept=".jpg,.jpeg,.png ,.gif"

                                    />
                                    {errors.profileImage?.type === "required" && (
                                        <p role="alert" className='text-red-800  text-[12px]'> * Profile Image  is required</p>
                                    )}
                                    {errors.profileImage?.type === "acceptedFormat" && (
                                        <p role="alert" className='text-red-800  text-[12px]'>{errors.profileImage.message || "* Only JPG, PNG, and JPEG are allowed"}</p>
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
                                        <label htmlFor="researcher">Researcher</label>
                                        <input
                                            type="radio"
                                            value="researcher"
                                            id='researcher'
                                            {...register("role", { required: true })} />

                                    </div>
                                    {errors.role?.type === "required" && (
                                        <p role="alert" className='text-red-800  text-[12px]'> * Role  is required</p>
                                    )}
                                </div>
                            </div>
                            <button
                                type='submit'
                                disabled={signupLoading}
                                className={`border rounded-lg px-4 py-2 w-[20vw]   font-staatliches mt-5 ml-20 text-[20px] ${signupLoading ? "bg-gray-400" : "bg-blue-500"}`}>{signupLoading ? (
                                    <div className='flex  ml-24'>
                                        <p className='pt-2 '>Signing In...</p>
                                        <LoaderCircle className='animate-spin mt-2' />
                                    </div>
                                ) : (
                                    <p className='pt-2 mr-4'>Sign Up</p>
                                )}</button>
                        </form>

                    </div>
                    <div>
                        <p className='font-roboto text-black ml-32'>Already have an account? <Link to='/login'
                            className='text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out'>Login</Link>
                        </p>
                    </div>
                </div>

            </div>


        </div>
    )
}
export default Signup
