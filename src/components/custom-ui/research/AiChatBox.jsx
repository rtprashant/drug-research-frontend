import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { GiMermaid } from "react-icons/gi";
import AiQueryBox from './AiQueryBox';
import AiResponseBox from './AiResponseBox';
import { useDispatch, useSelector } from 'react-redux';
import { getPromptFailure, getPromptSuccess, getResponseFailure, getResponseRequest, getResponseSuccess, setPromptAndResponse } from '../../../redux/features/research/aiResearch';
import axios from 'axios';

function AiChatBox() {
    const [query , setQuery ] = useState('')
    const {user,
        prompt,
        promptLoading,
        promptError,
        response,
        responseLoading,
        responseError} = useSelector((state)=>state.aiResearch)
    const dispatch = useDispatch()  
    const handleBtnClick = async ()=>{
        
        try {
            if(query.trim()===""){
                dispatch(getPromptFailure("Query cannot be empty"))
                
            }
        } catch (error) {
            console.log(error)
            
        }
        dispatch(getPromptSuccess(query))
        console.log(prompt);
        
        setQuery('')
        dispatch(getResponseRequest())

        try {
            const response =  await axios.post('http://localhost:5000/api/v1/researchs/aiResearch',{query},{
                headers:{
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            })
            dispatch(getResponseSuccess(response.data.data))
            console.log(response.data.data);
            
            
        } catch (error) {
            dispatch(getResponseFailure(error.message))
            console.log(error.message);
        }
        

    }
    return (
        <div className=''>
            <div className=' h-[40vw] w-[27vw]  p-10 shadow-xl rounded-lg bg-white '>

                <div className='flex '>
                    <h1 className='font-bold text-2xl '>ASK A.I.</h1>
                    <GiMermaid className='size-10'/>
                </div>
                <div className='h-[85%] overflow-auto flex flex-col gap-3'>
                    <AiQueryBox/>
                    <AiResponseBox/>

                </div>
                <div className='  pt-2'>
                    <div className='flex mt- gap-2 absolute '>
                        <div className=''>
                            <input type="text"
                                placeholder='Type A Message...'
                                className='border rounded-lg w-72 h-10 p-2 '
                                value={query}
                                onChange={(e)=>setQuery(e.target.value)}
                                 />
                        </div>
                        <div>
                            <button className='border rounded-lg '
                            onClick={handleBtnClick}><IoIosSend className='size-10 p-1' /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AiChatBox
