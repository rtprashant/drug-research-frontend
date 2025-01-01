import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { loginSuccess, logoutUser } from '../../../redux/features/auth/loginSlice';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
function ChnageDetails() {
    const [changePassword, setChangePassword] = useState(false)
    const { loggedInUser } = useSelector(state => state.login)
    const dispatch = useDispatch()
    const [buttons, setButtons] = useState(false)
    const [clearChanges, setClearChanges] = useState(false)
    const { handleSubmit, register, formState: { errors , isDirty }, reset , control } = useForm({
        defaultValues: {
            fullName: loggedInUser?.fullName || '',
            userName: loggedInUser?.userName || '',
            email: loggedInUser?.email || '',
            bio: loggedInUser?.bio || ''
        }
    })
    const changedValue = useWatch( {control} )
    const handleChangePassword = () => {
        setChangePassword(!changePassword)
    }
    const handleLogout = async () => {
        dispatch(logoutUser())
    }
    const initialValues = {
            fullName: loggedInUser?.fullName || '',
            userName: loggedInUser?.userName || '',
            email: loggedInUser?.email || '',
            bio: loggedInUser?.bio || '',
        };
    const handleInputChange = () => {
        
        const hasChanged = 
        initialValues.fullName !== changedValue.fullName ||
        initialValues.userName !== changedValue.userName ||
        initialValues.email !== changedValue.email ||
        initialValues.bio !== changedValue.bio;
        setButtons(hasChanged)

    }

    const handleClear = () => {
        reset(
            {
                fullName: loggedInUser?.fullName || '',
                userName: loggedInUser?.userName || '',
                email: loggedInUser?.email || '',
                bio: loggedInUser?.bio || ''
            })
        setButtons(false)
    }
    const handlePasswordClear = () => {
        setChangePassword(false)

    }
    const handleUserDetailsChanged = async (data) => {
        console.log(data);
        try {
            const res = await axios.patch(`${apiUrl}/api/v1/users/changeUserDetails` , data ,{
                headers:{
                    "Content-Type" : "application/json"
                },
                withCredentials : true 
            })
            console.log(res.data.data);
            
            const updatedUser = res.data.data;
        dispatch(loginSuccess(updatedUser)); 
        toast.success(res.data.message)
        reset({
            fullName: updatedUser.fullName,
            userName: updatedUser.userName,
            email: updatedUser.email,
            bio: updatedUser.bio,
        });
            setButtons(false)
        } catch (error) {
            console.log(error); 
            toast.error(error.response.data.data)
        }

    }
    const handlePasswordChange = async (data) => {
        try {
            const res = await axios.post(`${apiUrl}/api/v1/users/changePassword`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,

            })
            toast.success(res.data.message)
            setChangePassword(false)

        } catch (error) {
            toast.error(error.response.data.data)
        }
    }
    useEffect(()=>{
        setButtons(isDirty)
    } ,[isDirty])
    return (
        <div className='w-[50%] p-4 rounded-xl shadow-xl bg-white  flex flex-col gap-2'>
            <h1 className='font-roboto font-bold'>Personal Information</h1>
            <div className='border border-black w-full'></div>
            <form onSubmit={handleSubmit(handleUserDetailsChanged)}>
                <div>
                    <label htmlFor="fullName" className='font-roboto text-black '>Fullname</label>
                    <input
                        type="text"
                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                        id='fullName'
                        // value={userDetails.fullName}
                        onChange={handleInputChange}
                        {...register('fullName')}
                    />
                </div>
                <div>
                    <label htmlFor="userName" className='font-roboto text-black '>Username</label>
                    <input
                        type="text"
                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                        id='userName'
                        // value={userDetails.userName}
                        onChange={handleInputChange}
                        {...register('userName')}
                    />
                </div>
                <div>
                    <label htmlFor="email" className='font-roboto text-black '>E-Mail</label>
                    <input

                        type="email"
                        className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                        id='email'
                        // value={userDetails.email}
                        onChange={handleInputChange}
                        {...register('email')}

                    />
                </div>
                <div>
                    <label htmlFor="bio" className='font-roboto text-black '>Bio</label>

                    <textarea name="" id="bio"
                        className='font-roboto text-black w-full border border-black rounded-lg p-2 h-32'
                        // value={userDetails.bio}
                        onChange={handleInputChange}
                        {...register('bio')}
                    ></textarea>
                </div>
                {buttons && (
                    <div className='flex gap-3 ml-96'>
                        <button className='bg-gray-500 hover:bg-gray-700 text-white  py-2 px-4 rounded-xl'
                            onClick={handleClear}>Clear</button>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-xl' type='submit'>Save</button>
                    </div>
                )}

            </form>

            <div>
                <button className='text-blue-500 font-roboto' onClick={handleChangePassword}>Change Password ?</button>
                {changePassword && (
                    <form onSubmit={handleSubmit(handlePasswordChange)}>
                        <div>
                            <label htmlFor="newPassword" className='font-roboto text-black '>New Password</label>
                            <input type="password"
                                className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                id='newPassword'
                                {...register('newPassword', { required: true })}
                            />
                            {errors.newPassword?.type === "required" && (
                                <p role="alert" className='text-red-800  text-[12px]'> * Required Filed</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="reenterNewPassword" className='font-roboto text-black '>Re-Enter New Password</label>
                            <input type="password"
                                className='font-roboto text-black w-full border border-black rounded-lg p-2 '
                                id='reenterNewPassword'
                                {...register('reenterNewPassword', { required: true })} />
                            {errors.reenterNewPassword?.type === "required" && (
                                <p role="alert" className='text-red-800  text-[12px]'> * Required Filed</p>
                            )}
                        </div>
                        <div className='flex gap-3 ml-96 mt-2'>
                            <button className='bg-gray-500 hover:bg-gray-700 text-white  py-2 px-4 rounded-xl'
                                onClick={handlePasswordClear}>Clear</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-xl' type='submit'>Save</button>
                        </div>
                    </form>
                )}
            </div>
            <div>
                <button className='text-blue-500 font-roboto' onClick={handleLogout}>Log Out</button>
            </div>

        </div>
    )
}

export default ChnageDetails
