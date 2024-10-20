import React from 'react'
import logo from '../custom-ui/dna.svg'
import { RxDashboard } from "react-icons/rx";
import { SiMoleculer } from "react-icons/si";
import { FaBalanceScale } from "react-icons/fa";
import { GiMicroscope } from "react-icons/gi";
import { MdMessage } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';

function SideBar() {
    const sideBar = [
        {   
            id : 1,
            to :"/",
            name : 'DashBoard',
            icon : <RxDashboard/>,
        },
        {
            id : 2,
            to : "/moleculebank",
            name : 'Molecule Bank',
            icon :<SiMoleculer/>
        },
        {
            id : 3,
            to : "/genratemolecule",
            name : 'Generate Molecule',
            icon : <FaBalanceScale/>
        },
        {
            id : 4,
            to : "/research",
            name : 'Research',
            icon : <GiMicroscope/>
        },
        {
            id : 5,
            to : "/message",
            name : 'Message',
            icon : <MdMessage/>
        },
        {
            id : 6,
            to : "/settings",
            name : 'Settings',
            icon :  <IoIosSettings/>
        }
    ]
  return (
    <div className=' h-screen fixed w-[20%] bg-[#1C2434]'>
        <div className='flex mt-5 gap-5 px-10 py-5'>
            <img src={logo} alt="no image " className='bg-blue-800 rounded-sm' />
            <h1 className='text-white text-[20px] font-bold font-spaceGrotesk mt-1'>ProtienBind</h1>
        </div>
        <div className='text-white text-[25px] font-dmSerif px-5 mt-10'>
            
            {sideBar.map((items)=>(
                
                <div key={items.id} className='flex flex-col mt-5'>
                    <NavLink to={items.to} className={({isActive})=>`${isActive?"bg-[#333A48] rounded-sm px-2 transition duration-300 ease-in-out":""}`}>
                    <div className='flex gap-2'>
                        <div className='mt-2'>
                            {items.icon}
                        </div>
                        <div>
                            {items.name}
                        </div>
                    </div>
                    </NavLink>

                </div>
                
            ))}
        </div>
      
    </div>
  )
}

export default SideBar
