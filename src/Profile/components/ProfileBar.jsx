import React, { useEffect, useState } from 'react'
import { User } from '@phosphor-icons/react'

export default function ProfileBar({user}) {
  return (
    <div className='w-1/4 h-fit bg-white bg-opacity-30 rounded-md flex flex-col items-center p-5'>
      <div className='w-52 h-52 rounded-full bg-gray-300 flex justify-center items-center overflow-clip'>
      <User size={250} weight="bold" />
      </div>
      <div className='text-3xl font-primaryFont text-black'>Username:</div>
      {user && <div className='text-4xl font-primaryFont text-white rounded-md p-1 hover:border-2 hover:cursor-pointer'>{user.username}</div>}
      <div className='text-lg font-primaryFont text-black'>User ID:</div>
      {user && <div className='text-lg font-primaryFont text-white rounded-md p-1 hover:border-2 hover:cursor-pointer'>{user.user_id}</div>}
      <div className='text-lg font-primaryFont text-black'>Email ID:</div>
      {user && <div className='text-lg font-primaryFont text-white rounded-md p-1 hover:border-2 hover:cursor-pointer'>{user.email_id}</div>}
    </div>
  )
}
