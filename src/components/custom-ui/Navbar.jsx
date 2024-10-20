import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,

} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { IoMdSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { useSelector ,useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/features/auth/userSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL;



function Navbar() {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogout = async() => {
        await axios.post(`${apiUrl}/api/v1/users/logout`,user ,{
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials:true    
        })
        dispatch(logoutUser())
        }
    return (
        <div className=' shadow-lg flex h-20 items-center font-roboto bg-white   '>
            <div className='ml-[47vw] flex  '>
                <div className='mr-20 size-10 text-[2vw] mt-1'>
                    <BiSolidMessageRoundedDots />
                </div>
                <div className='flex flex-col gap-0 mt font-roboto overflow-hidden '>
                    <p>{user ? user?.fullName : "Prashant Kumar Rajput"}</p>
                    <p className=' mt-[-0.4vw] w-20  overflow-hidden text-slate-500'>{user ? user?.role : "admin"}</p>
                </div>
                <div className='bg-white '>


                    <NavigationMenu>
                        <NavigationMenuList className="">
                            <NavigationMenuItem>
                                <div className='bg-white mr-20'>
                                    <NavigationMenuTrigger>

                                        <Avatar>
                                            <AvatarImage src={user ? user.profileImage : "https://github.com/shadcn.png"} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                    </NavigationMenuTrigger>
                                </div>

                                <NavigationMenuContent className=" bg-white border shadow-sm  ">
                                    <div className='w-40 flex flex-col gap-2 p-2  '>
                                        <div className='flex gap-2'>
                                            <div className='mt-1'>
                                                <IoPersonSharp />
                                            </div>
                                            <div>
                                                <Link to='/myProfile'>My Profile</Link>
                                            </div>
                                            
                                        </div>
                                        <div className='flex gap-2'>
                                            <div className='mt-1'>
                                                <IoMdSettings />
                                            </div>
                                            <div>
                                                <Link to='/settings'>Setting</Link>
                                            </div>
                                            
                                        </div>
                                        <Separator />
                                        <div className='flex gap-2'>

                                            <div className='mt-1'>
                                                <LuLogOut />
                                            </div>
                                            <div className=' hover:cursor-pointer'
                                            onClick={handleLogout}>
                                                <NavigationMenuLink>LogOut</NavigationMenuLink>
                                            </div>
                                        </div>
                                    </div>

                                </NavigationMenuContent>

                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                </div>
            </div>

        </div>
    )
}

export default Navbar
