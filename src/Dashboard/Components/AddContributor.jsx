import React, { useEffect, useState } from 'react'
import { Coffee, MagnifyingGlass,XCircle } from '@phosphor-icons/react'
import supabase from '../../config/supabaseClient'

export default function AddContributor({toggleSearchState,project}) {
    const [searchuser,setSearch] = useState()
    const [searchResults,setResults] = useState()
    const [error,setError] = useState()
    const [myUserId,setMyuserID] = useState()
    useEffect(()=>{
        const GetUser = async()=>{
            const user = await supabase.auth.getUser()
            // console.log(user)
            if(user.data)setMyuserID(user.data)
            else console.log(user.error)
        }
        GetUser()
    },[])
    const sendInvite = async(user_id)=>{
        console.log(myUserId)
        const response = await supabase.from("Invites").insert({sent_by:myUserId.user.id,sent_to:user_id,project_id:project.project_id}).select()
        console.log(response)
    }
    const handleSearchUser = async()=>{
        if(!searchuser){
            setError("*(Enter Username or Email ID:)")
        }else{
            const responses = await supabase.from("userDetails").select().or(`username.ilike.%${searchuser}%`,`emailid.ilike.%${searchuser}%`)
            if(responses.data){
                setResults(responses.data)
            }
            else{
                setError("* User not found")
                setResults("")
            }
        }
    }
  return (
    <div className='min-h-10 w-fit absolute bg-gray-100 rounded-md p-3 z-50 left-1/2 -translate-x-1/2 top-5'>
        <XCircle size={20} className='absolute right-5 hover:cursor-pointer' onClick={toggleSearchState}/>
        <div className='text-lg font-primaryFont'>Search Contributor:</div>{error && <span className='text-red-600 text-sm font-primaryFont'>{error}</span>}
      <div className='flex w-full'>
        <input className='focus:outline-none rounded-md px-2 py-1 w-96' onChange={(e)=>{setSearch(e.target.value);setError("")}}/>
        <button className='px-3 py-1 rounded-md bg-sky-900' onClick={handleSearchUser}><MagnifyingGlass size={20} color='white'/></button>
      </div>
      {searchResults &&
        searchResults.map((result,index)=>{
            return <div key={index} className='p-2 rounded-md bg-gray-200 my-1 hover:bg-gray-300 font-primaryFont text-lg flex justify-between'>
                <div>
                <div><span className='font-bold'>Username:</span> {result.username}</div>
                <div><span className='font-bold'>EmailID:</span>  {result.email_id}</div>
                </div>
                <div className='flex flex-col justify-center items-center rounded-md bg-sky-900 px-3 py-1 hover:cursor-pointer' onClick={()=>sendInvite(result.user_id)}>
                    <Coffee size={25} weight='bold' color='white'/>
                    <div className='text-white'>Invite</div>
                </div>
            </div>
        })
      }
      {
        searchResults && searchResults.length===0 &&
        <div className='flex justify-center items-center p-3 text-lg font-primaryFont'>User Not Found</div>
      }
    </div>
  )
}
