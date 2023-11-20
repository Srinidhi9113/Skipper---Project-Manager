import React, { useEffect, useState } from 'react'
import supabase from '../../config/supabaseClient'

export default function InvitesBlock({user}) {
  const [invites,setInvites] = useState([])

  const handleAccept = async(invite,index)=>{
    const tempInvites = invites
    tempInvites.splice(index,1)
    setInvites(tempInvites)
    const response = await supabase.from("Project").insert({project_name:invite.project_name.project_name,owner_id:invite.sent_by,user_id:user.user_id,role:"Developer"}).select()
    if(response.data){
      const del = await supabase.from("Invites").delete().eq("invite_id",invite.invite_id)

    }
  }
  const handleReject = async(invite,index)=>{
    const del = await supabase.from("Invites").delete().eq("invite_id",invite.invite_id)
    const tempInvites = invites
     tempInvites.splice(index,1)
    setInvites(tempInvites)
  }

  useEffect(()=>{
    const GetInvites = async()=>{
      const invitesRes = await supabase.from("Invites").select("invite_id,sent_by,project_id,project_name:project_id(project_name),owner_name:sent_by(username)").eq("sent_to",user.user_id)
      console.log(invitesRes.data)
      if(invitesRes.data) setInvites(invitesRes.data)
      else console.log(invitesRes.error)
    }
    GetInvites()
  },[])

  return (
    <div className='w-full h-full bg-white bg-opacity-30 rounded-md py-3 px-5 flex flex-col'>
      <div className='text-black text-4xl font-primaryFont'>Invites...</div>
      <div className='flex flex-row w-full h-full gap-2 overflow-auto scrollbar-none'>
        {
          invites && invites.map((invite,index)=>{
            return <div className='h-full bg-white shrink-0 w-96 rounded-md bg-opacity-70 p-5' key={index}>
              <div className='text-lg font-primaryFont'>{invite.owner_name.username} invites you to collaborate on</div>
              <div className='text-5xl font-primaryFont h-full flex flex-col mt-3 items-center'>
                <div>Project Name:</div>
                <div>{invite.project_name.project_name}</div>
                <div className='flex flex-row gap-5 items-center pt-3'>
                  <button className='p-3 bg-green-600 bg-opacity-70 rounded-md hover:bg-opacity-90' onClick={()=>handleAccept(invite,index)}>Accept</button>
                  <button className='p-3 bg-red-600 bg-opacity-70 rounded-md hover:bg-opacity-90'  onClick={()=>handleReject(invite,index)}>Reject</button>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}
