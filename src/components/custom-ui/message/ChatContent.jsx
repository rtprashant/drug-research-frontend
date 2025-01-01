import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { IoIosSend } from "react-icons/io";
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(apiUrl);

function ChatContent() {
  const { groupName } = useParams()
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageHistory , setMessageHistory] = useState([]);
  const bottomRef = useRef(null)
  const [threeDots , setThreeDots] = useState(false)
  const [members , setMembers] = useState([])
  const { loggedInUser,
    loggedInLoading,
    loggedInError } = useSelector(state => state.login)

  const handleThreeDots = ()=>{
    setThreeDots(!threeDots)
  } 

  useEffect(() => {
   
    socket.emit("joinGroup", groupName);
    
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    setMessages([]);
    
    return () => {
      socket.off("message");
    };
  }, [groupName]);
  
  const sendMessage =async () => {
    if (message.trim() && loggedInUser) {
      const newMessage = {
        groupName,
        message,
        senderName: loggedInUser.userName
      };
      try {
        const postMessage = await axios.post(`${apiUrl}/api/v1/message/postMessages/${groupName}`, {
          text: newMessage.message,
          sender: newMessage.senderName
        },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          })
          console.log(postMessage);
          
      } catch (error) {
        console.error(error);
        
      }
      socket.emit("message", newMessage); 
      setMessages((prevMessages) => [...prevMessages, newMessage]); 
      setMessage('');
    }
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageHistory]);


  useEffect(()=>{
    const getMessages = async ()=>{
      try {
        const msg = await axios.get(`${apiUrl}/api/v1/message/getMessage/${groupName}`,{
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        })
        console.log(msg.data.data);
        setMessageHistory(msg.data.data);
      } catch (error) {
        console.error(error);
        
      }
    }
    getMessages();
  },[groupName])

  useEffect(()=>{
    const getGroupMembers = async ()=>{
      try {
        const response = await axios.get(`${apiUrl}/api/v1/message/getMembers/${groupName}`,{
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        })
     
        setMembers(response.data.data)
        console.log("group members"+members);
        
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
    getGroupMembers()
  },[groupName])

  const leaveGroup = async()=>{
    try {
      const response = await axios.post(`${apiUrl}/api/v1/message/leaveGroup/${groupName}`,{},{
        headers: {
          "Content-Type":"application/json"
        },
          withCredentials: true
        
      })
      console.log(response.data);
      toast.success(response.data.message)
    } catch (error) {
      console.log(error.response);
      
    }

  }

  return (
    <div>
      <div className='w-full  ml-96 p-5 h-16 bg-gray-100 flex justify-between'>
        <h1 className='font-semibold ml-10'>{groupName}</h1>
        <button className='mr-10' onClick={handleThreeDots}><BsThreeDotsVertical/></button>
      </div>
      <div className='w-full ml-96 p-5 h-[483px] bg-white overflow-auto'>
        <div>
          {messageHistory.length>0?(
            <div>
                {messageHistory.map((msg)=>(
                  <div key={msg._id} className="message mb-2">
                  <p className='text-[12px]'>{loggedInUser.userName===msg.sender ? "You" : msg.sender}</p>
                  <p className={`${loggedInUser?.userName?.trim()===msg?.sender?.trim() ?"bg-blue-500 p-2 rounded-xl w-fit":"bg-gray-100 p-2 rounded-xl w-fit"} `}>{msg.text}</p>
                </div>
                ))}
            </div>
          ):(
            <div>
              <h1 className='text-center text-2xl font-bold mt-10'>No messages Start A Conversation</h1>
            </div>
          )}
        </div>
        <div className="messages overflow-auto  mb-4 -mt-1">
          { messages.map((msg, index) => (
            <div key={index} className="message mb-2">
              <p className='text-[12px]'>{loggedInUser.userName===msg.senderName ? "You" : msg.senderName}</p>
              <p className={`${loggedInUser?.userName?.trim()===msg?.senderName?.trim() ?"bg-blue-500 p-2 rounded-xl w-fit":"bg-gray-100 p-2 rounded-xl w-fit"} `}>{msg.message}</p>
             
            </div>
          ))}
          
        </div>
        <div ref={bottomRef} />
      </div>
      <div className='w-full  ml-96 p-5 h-16 bg-gray-100 '>
        <div className='w-full flex gap-2'>
          <input type="text"
            className='w-[90%] h-10 -mt-2 rounded-xl p-4'
            placeholder='Type A Message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)} />
          <div>
            <button className='border rounded-lg -mt-2 '
              onClick={sendMessage}><IoIosSend className='size-10 p-1' /></button>
          </div>
        </div>
      </div>
      {
        threeDots && (
          <div className='absolute mt-[-39vw] p-2 bg-gray-100 w-72 right-5 shadow-lg h-[38vw] overflow-auto'>
            <button onClick={handleThreeDots} className='ml-64'>X</button>
            <div className='flex justify-center'>
              <h1 className='font-spaceGrotesk font-bold text-2xl'>{groupName}</h1>
            </div>
            <div className=' h-[30vw] w-[70%] ml- mt-3 overflow-auto flex flex-col gap-2'>
              {
                members.map((member)=>(
                  <div className='flex gap-2  flex-wrap' key={member._id}>
                <img
                  src={member.profileImage}
                  className='h-10 w-10 rounded-full'
                  alt=""
                />
                <p className='mt-2'>{member.fullName}</p>
              </div>
                ))
              }

            </div>
            <div className='mt-2 fixed ' >
              <button className='text-blue-500' onClick={leaveGroup}>Leave {groupName} ?</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ChatContent
