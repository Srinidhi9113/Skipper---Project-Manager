import React, { useEffect, useState } from 'react'
import ProfileBar from './components/ProfileBar'
import ProjectBlock from './components/ProjectBlock'
import InvitesBlock from './components/InvitesBlock'


import supabase from '../config/supabaseClient'

export default function Profile() {
  const [user,setUser] = useState()
  useEffect(()=>{
      const GetUser = async()=>{
          const user = await supabase.auth.getUser()
          // console.log(user)
          if(user.data){
            const response = await supabase.from("userDetails").select().eq("user_id",user.data.user.id).single()
            if(response.data) setUser(response.data)
            else console.log(error)
          // console.log(response)
          }
          else console.log(user.error)
        // console.log(user)
      }
      GetUser()
  },[])
  return (
    <div className='bg-mainBG bg-fixed bg-center bg-cover bg-no-repeat h-screen w-screen min-h-screen flex flex-row p-2'>
      {user && <ProfileBar user={user}/>}
      <div className='flex flex-col w-3/4 gap-3 p-3'>
        {user && <ProjectBlock user={user}/>}
        {user && <InvitesBlock user={user}/>}
      </div>
    </div>
  )
}
