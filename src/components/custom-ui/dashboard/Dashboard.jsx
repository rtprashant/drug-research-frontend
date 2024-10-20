import React from 'react'
import DashboardTopBox from './DashboardTopBox'
import { SiMoleculer } from "react-icons/si";
import { GiMicroscope } from "react-icons/gi";
import { MdMessage } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import DashboardChatBox from './DashboardChatBox';
import DashboardMoleculeHistory from './DashboardMoleculeHistory';

function Dashboard() {
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
  return (
    <div className='flex flex-col gap-5'>
      <div className='w-full p-10 flex justify-between '>
      {topBox.map((item)=>(
        <div key={item.id}>
          <DashboardTopBox 
          Icon={item.icon}
          heading={item.title}
          path={item.path}
          info={item.info} />
        </div>

      ))}
    </div>
    <div className='p-10 flex gap-5 justify-evenly'>
      <div className=' '>
      <DashboardChatBox/>
      </div>
      <div>
      <DashboardMoleculeHistory/>
      </div>
      

    </div>
    </div>
  )
}

export default Dashboard
