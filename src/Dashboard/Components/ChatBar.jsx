import React, { useEffect, useState } from 'react'
import { ShareFat,ArrowsClockwise } from '@phosphor-icons/react'
import supabase from '../../config/supabaseClient'

export default function ChatBar({project}) {
    const [message,setMessage] = useState()
    const [history,setHistory] = useState()
    const [user,setUser] = useState()
    const GetMessages = async()=>{
        const response = await supabase.from("Chat").select("chat_id,message,sent_at,userDetails(username)").eq("project_id",project.project_id).order("sent_at",{ascending:false})
        console.log(response)
        if(response.data) setHistory(response.data)
    }
    useEffect(()=>{
        const GetUser = async()=>{
            const response = await supabase.auth.getUser()
            if(response.data) setUser(response.data.user)
            // console.log(response)
        }
        GetUser()
        GetMessages()
    },[])
    const sendMessage = async()=>{
        if(message){
            const response = await supabase.from("Chat").insert({project_id:project.project_id,sent_by:user.id,message:message}).select()
            if(response.data){
                // setHistory(prev=>prev.push({...response.data[0],userDetails:{username:"You"}}))
                const tempList = history
                tempList.push({...response.data[0],userDetails:{username:"You"}})
                // console.log(tempList)
                setHistory(tempList)
            }
        }
    }
  return (
    <div className='h-fit w-fit bg-white bg-opacity-30 mx-2 my-2 rounded-md px-3 py-2'>
        <div className='flex justify-between items-center pr-3'>
      <div className='text-3xl font-primaryFont text-white'>Chats...</div>
      <ArrowsClockwise size={20} weight="bold" color="white"/>
      </div>
      <div className='bg-white bg-opacity-50 ring-2 h-96 rounded-md flex flex-col-reverse p-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full'>
        {history && history.map((message)=>{
            return <div key={message.chat_id} className='bg-white bg-opacity-50 rounded-md my-2 p-1'>
                        <div className='text-lg font-primaryFont'>{message.userDetails.username}:</div>
                        <div className='bg-white bg-opacity-70 rounded-md p-1'>{message.message}</div>
                    </div>
        })}
      </div>
      <div className='flex p-1 gap-2 items-center'>
      <input className='w-52 rounded-md mt-2 p-2 bg-opacity-50 h-full' placeholder='Chat...' onChange={(e)=>setMessage(e.target.value)}></input>
      <button className='px-3 py-2 mt-1 rounded-md bg-sky-950'><ShareFat size={23} color='white' onClick={sendMessage}/></button>
      </div>
    </div>
  )
}
