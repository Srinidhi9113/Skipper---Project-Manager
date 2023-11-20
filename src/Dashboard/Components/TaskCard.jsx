import React,{useState} from 'react'
import { Trash,Info } from '@phosphor-icons/react'
import { Popover } from 'keep-react'

export default function TaskCard({task,handleDelete}) {
  return (
    <div className='bg-white bg-opacity-80 text-black mx-2 my-1 py-1 rounded-lg p-3 text-lg flex flex-row justify-between items-baseline'>
      <div>
      <div className='text-xs max-h-[18px] overflow-clip'>{task.task_id}</div>
      <div className='text-xl'>{task.task_name}</div>
      </div>
      <div className='flex justify-center items-center h-full' onClick={()=>handleDelete(task)}>
      <Trash size={20} weight="fill" color="black"/>
      <div>
      <Popover
      trigger='hover'
      title={task.task_name}
      description={task.comments?task.comments:task.task_name}
      className='w-fit'
      position='right-end'
      >
        <Info size={20} weight="fill" />
      </Popover>
      </div>
      </div>
    </div>
  )
}
