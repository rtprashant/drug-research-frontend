
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaPlus } from "react-icons/fa";
import axios from "axios"
import { toast } from 'sonner'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_BACKEND_URL;
function ChatMenu() {
    const [btnclick, setBtnclick] = useState(false)
    const [groups, setGroups] = useState([])
    const [newChat, setNewChat] = useState(false)
    const [existingChat, setExistingChat] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const handleBtnClick = () => {
        setBtnclick(!btnclick)
        setExistingChat(false)
        setNewChat(false)
    }
    const handleNewChat = () => {
        setNewChat(!newChat)
        setExistingChat(false)
    }
    const handleExistingChat = ()=>{
        setExistingChat(!existingChat)
        setNewChat(false)
    }
    const handleSubmitEventNewChat = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/v1/message/createNewGroup`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            console.log(response.data.data)
            setGroups([...groups, response.data.data])
            toast.success("Group created successfully")


        } catch (error) {
            console.log(error.response.data.data);
            toast.error(error.response.data.data)
        }
        console.log(data);
        setBtnclick(false)
        setNewChat(false)
        reset()
    }

    const handleSubmitEventExistingChat = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/v1/message/addMemberViaPassword`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            setGroups([...groups, response.data.data])
            toast.success(response.data.message)


        } catch (error) {
            toast.error(error.response.data.data)
        }
        console.log(data);
        setBtnclick(false)
        setExistingChat(false)
        reset()
    }

    useEffect(() => {
        const userGroupDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/message/getGroups`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                })
                console.log(response.data.data)
                setGroups(response.data.data)

            } catch (error) {
                console.log(error);
            }
        }
        userGroupDetails()
    }, [])

    const handleGroupNameClicked = (groupName) => {
        navigate(`/message/${groupName}`)

    }
    return (
        <div className='w-[25vw] bg-gray-100 shadow-lg   h-screen fixed overflow-auto'>
            <div className='flex flex-col gap-5'>
                <div className='fixed bg-gray-100 w-[25vw] p-5 flex justify-between'>
                    <h1 className='font-bold text-[30px] '>Chats</h1>
                    <button onClick={handleBtnClick} className={`${btnclick ? "transform rotate-45" : ""} transition-transform duration-200`}><FaPlus /></button>
                </div>
                <div className=' fixed mt-12'>
                    {btnclick && <div className='bg-gray-100 p-5 w-[vw] rounded-xl shadow-xl ml-52 -mt- flex flex-col gap-2 '>

                        <p className='font-staatliches hover:cursor-pointer' onClick={handleExistingChat}>JOIN A EXISTING CHAT</p>
                        <div className='border'></div>
                        <p className='font-staatliches hover:cursor-pointer' onClick={handleNewChat}>CREATE A NEW CHAT</p>
                    </div>}

                </div>
                {/* form for  a New chat */}
                {
                    newChat && (
                        <div className='mt-40 fixed bg-white w- px-14 py-5 ml-4 rounded-xl shadow-xl'>
                            <form className='' onSubmit={handleSubmit(handleSubmitEventNewChat)}>
                                <div className='flex justify-between'>
                                    <h1 className='font-bold text-[20px] '>Create a New Chat</h1>
                                    <button onClick={handleNewChat} className={`${btnclick ? "transform rotate-45" : ""} transition-transform duration-200`}><FaPlus /></button>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        <input type="text" placeholder="Enter name" id='groupName' className="w-[15vw] h-8 rounded-lg p-2 bg-gray-100"
                                            {...register("groupName", { required: true })} />
                                        {errors.groupName?.type === "required" && (
                                            <p role="alert" className='text-red-800  text-[12px]'> * Name  is required</p>
                                        )}
                                    </div>
                                    <div>
                                        <input type="password" placeholder="Enter password" id='password' className="w-[15vw] h-8 rounded-lg p-2 bg-gray-100"
                                            {...register("password", { required: true })} />
                                        {errors.password?.type === "required" && (
                                            <p role="alert" className='text-red-800  text-[12px]'> * Password  is required</p>
                                        )}
                                    </div>
                                    <div>
                                        <button className='bg-blue-500 text-white p-2 rounded-md w-[15vw]' type='submit'>Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }
                {/* form for a existing chat chat */}
                {
                     existingChat && (
                        <div className='mt-40 fixed bg-white w- px-14 py-5 ml-4 rounded-xl shadow-xl'>
                            <form onSubmit={handleSubmit(handleSubmitEventExistingChat)} className=''>
                                <div className='flex justify-between'>
                                    <h1 className='font-bold text-[20px] '>Join a Chat</h1>
                                    <button onClick={handleExistingChat} className={`${btnclick ? "transform rotate-45" : ""} transition-transform duration-200`}><FaPlus /></button>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        <input type="text" placeholder="Enter name" id='groupName' className="w-[15vw] h-8 rounded-lg p-2 bg-gray-100"
                                            {...register("groupName", { required: true })} />
                                        {errors.groupName?.type === "required" && (
                                            <p role="alert" className='text-red-800  text-[12px]'> * Name  is required</p>
                                        )}
                                    </div>
                                    <div>
                                        <input type="password" placeholder="Enter password" id='password' className="w-[15vw] h-8 rounded-lg p-2 bg-gray-100"
                                            {...register("password", { required: true })} />
                                        {errors.password?.type === "required" && (
                                            <p role="alert" className='text-red-800  text-[12px]'> * Password  is required</p>
                                        )}
                                    </div>
                                    <div>
                                        <button className='bg-blue-500 text-white p-2 rounded-md w-[15vw]' type='submit'>JOIN</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }
                <div className=' overflow-auto mt-16 p-5 pb-24'>
                    {
                        groups.length > 0 ? (
                            groups.map((group) => (
                                <div key={group._id} onClick={() => handleGroupNameClicked(group.groupName)}>

                                    <div className='flex flex-col gap-2 h-16  justify-center'>
                                        <h1 className='uppercase hover:cursor-pointer  '
                                        >{group.groupName}</h1>

                                    </div>

                                    <div className='border'></div>
                                </div>

                            ))

                        ) : (
                            <div>
                                <h1 className='font-bold text-[20px] '>No Groups Found</h1>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatMenu
