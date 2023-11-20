import React, { useEffect, useState } from 'react'
import { Avatar,Card } from "keep-react";
import { PaperPlaneTilt, Pen } from '@phosphor-icons/react';
import supabase from '../../config/supabaseClient';
import { ChatText } from '@phosphor-icons/react/dist/ssr';

export default function TopBar({project,toggleShowChat}) {
  const [showProfile,setShowProfile] = useState(false)
  const [user,setUser] = useState()
  const [role,setRole] = useState()
  useEffect(()=>{
    const FetchUser = async()=>{
      const user = await supabase.auth.getUser()
      const response = await supabase.from("userDetails").select('username,user_id').eq("user_id",user.data.user.id).single()
      if(response.data)setUser(response.data)
      else console.log(response.error)
    }
    FetchUser()
  },[project])
  useEffect(()=>{
    const FetchRole = async()=>{
      if(project){
        const response = await supabase.from("Project").select('role').match({user_id:user.user_id,project_id:project.project_id}).single()
        if(response.data) setRole(response.data.role)
        else console.log(response.error)
      }
    }
    FetchRole()
  },[project])
  return (
        <div className='bg-white bg-opacity-30 h-14 w-full rounded-xl flex justify-between items-center text-white p-5 font-primaryFont relative'>
          <div className='text-xl'></div>
          <div className='sm:text-4xl sm:visible invisible'>Skipper</div>
          <div className='flex items-center gap-5'>
            <div className='rounded-md bg-white px-1 flex flex-col justify-center items-center gap-0 hover:cursor-pointer' onClick={toggleShowChat}>
              <ChatText size={20} weight="bold" color="black"/>
              <div className='text-black -mt-1'>Inbox</div>
            </div>
          <div className='text-2xl hover:cursor-pointer' onClick={()=>setShowProfile(prev=>!prev)}>
            <Avatar
            shape="circle"/>
          </div>
          </div>
        {showProfile && <Card className="absolute top-16 right-5 max-w-[300px] p-6 bg-slate-900 z-50">
        <Card.Container className="flex items-center justify-center">
          <Avatar
            shape="circle"
            statusPosition="bottom-right"
            size="2xl"
          />
        </Card.Container>
        <Card.Container className="text-center">
          <Card.Title className="text-3xl md:text-3xl text-slate-100">
            {user?user.username:""}
          </Card.Title>
          <Card.Title className="font-normal md:font-medium text-metal-400">
            {role?role:""}
          </Card.Title>
        </Card.Container>
        <Card.Container className="mx-auto flex max-w-[250px] rounded-md items-center justify-center divide-x divide-metal-200 circled border border-metal-200 p-1 md:p-2">
        <Card.Link
            className="flex flex-col items-center justify-center py-1 px-3 text-sm font-light"
            
            // href="#"
          ><div className='flex flex-col items-center justify-center'>
            <PaperPlaneTilt size={24} color="white" weight="fill" />
            <span className='text-white'>View Invites</span>  
          </div></Card.Link>
        <Card.Link
            className="flex flex-col items-center justify-center py-1 px-3 text-sm font-light"
            
            // href="#"
          ><div className='flex flex-col items-center justify-center'>
            <Pen size={24} color="white" weight="fill" />
            <span className='text-white'>Edit Profile</span> 
          </div></Card.Link>
          
        </Card.Container>
      </Card>}
        </div>
  )
}
