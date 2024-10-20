import axios from 'axios';
import React, { useState } from 'react';
import AiChatBox from './AiChatBox';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getMoleculeDetailsFailure, getMoleculeDetailsRequest, getMoleculeDetailsSuccess } from '../../../redux/features/research/moleculeDetailsResearchSlice';
import { toast } from 'sonner';
import Skelton from './Skelton';
import ResearchResponse from './ResearchResponse';

function Research() {
  const [title, setTitle] = useState("");
  const [response , setResponse] = useState("");
  const dispatch = useDispatch()
  const { loading , error , moleculeDetails } = useSelector((state) => state.moleculeDetails);
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(getMoleculeDetailsRequest())
    try {
      const response = await axios.post('http://localhost:5000/api/v1/researchs/research', {
        title: title
  
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      )
      setResponse(response.data?.data?.Properties[0]);
      console.log(response.data?.data?.Properties[0]);
      
      setTitle("");
      dispatch(getMoleculeDetailsSuccess(response.data?.data?.Properties[0]))
    } catch (error) {
      dispatch(getMoleculeDetailsFailure(error))
      console.log(error.response.data.data);
      
      toast.error(error.response.data.data)
      
    }
    console.log(response.data?.data?.Properties[0]);
  };

  return (
    <div className='flex gap-10 p-20 justify-between    '>
      <div className=' w-[40%] flex-nowrap'>
        <AiChatBox />
      </div>
      <div className='w-full flex flex-col gap-10 bg-white rounded-lg p-10 h-full'>
        <div className=' w-full flex-nowrap  shadow-lg  rounded-lg gap-2'>
          <form onSubmit={handleSubmit}
            className='flex  '>
            <input
              className='bg-white rounded-xl w-[90%] p-2  h-12 '
              type="text"
              name="about"
              placeholder='Search Molecule...'
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type='submit' className=' rounded-xl px-4 bg-white'><FaSearch className='size-5' /></button>
          </form>
        </div>
        <div>
          {
            loading ? <Skelton/>:<ResearchResponse/>
              

          }  
          {/* <ResearchResponse/> */}
        </div>
      </div>
    </div>
  );
}

export default Research;
