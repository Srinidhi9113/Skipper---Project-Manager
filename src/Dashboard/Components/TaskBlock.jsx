import React, { useState } from 'react'
import TaskCard from './TaskCard'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { PlusCircle } from '@phosphor-icons/react'
import { Tooltip } from 'keep-react'
import supabase from '../../config/supabaseClient'

export default function TaskBlock(props) {
  const [taskname,setTaskname] = useState()
  const [assignee,setAssignee] = useState()
  const [description,setDescription] = useState()
  const [error,setError] = useState()
  const [showForm,setShowForm] = useState(false)
  const pushTaskCard = async()=>{
    if(!taskname || !assignee){
      setError("*(Enter Details...)")
    }else{
      const response = await supabase.from("Tasks").insert({task_name:taskname,assigned_to:assignee,comments:description,project_id:props.project,project_status:"To-Be Done"}).select()
      if(response.data){
        props.setTask(response.data[0])
        setShowForm(false)
      }
      else{
        console.log(response.error)
      }
    }
  }
  return (
    <div className='bg-white bg-opacity-30 w-full text-white rounded-lg h-96 p-3 text-2xl font-primaryFont pb-2 flex flex-col'>
      <div className='flex justify-between'>
        <div>{props.title}:</div>
        {props.title==="To-Be Done" && 
                <div className=''>
                <Tooltip
          content="Click to add a new Task Card"
          trigger="hover"
          placement="right"
          animation="duration-300"
          style="dark"
        >
                  <PlusCircle size={32} weight="fill" color='white' className='hover:cursor-pointer' onClick={()=>setShowForm(prev=>!prev)}/>
                  
            
        </Tooltip>
                  {showForm &&
                  <div className="flex flex-col mt-3 text-gray-600 text-base items-start w-72 absolute bg-white p-5 rounded-md">
                    <span className='text-xl text-gray-900'>Add a Task Card...</span>
                    <span className='text-lg text-gray-600'>Enter Task Details: </span>
                {error && <span className='text-sm text-red-800'>{error}</span>}
                <label>Task Name: </label>
                <input className='w-full focus:outline-none rounded-md border-2 border-gray-400 px-1' onChange={(e)=>setTaskname(e.target.value)}/>
                <label>Assigned To: </label>
                <select className='w-full focus:outline-none rounded-md border-2 border-gray-400 px-1' defaultValue="" onChange={(e)=>{setAssignee(e.target.value)}}>
                  <option disabled value=""> Select A Contributor...</option>
                  {props.contributors.map((data,index)=>{
                    return <option value={data.user_id} key={index}>{data.userDetails.username}</option>
                  })}
                </select>
                <label>Description: </label>
                <textarea className='w-full focus:outline-none rounded-md border-2 border-gray-400 px-1' onChange={(e)=>setDescription(e.target.value)}/>
                <div className='flex justify-center items-center w-full mt-2'><button className='py-2 px-3 bg-sky-900 text-white rounded-md' onClick={pushTaskCard}>Create</button></div>
              </div>}
                </div>
        }
      </div>
      <Droppable droppableId={props.title} isDropDisabled={false}>
        {(provided)=>{
            return (<div ref={provided.innerRef} {...provided.droppableProps} className='h-full rounded-lg border-2 overflow-auto scrollbar-thin scrollbar-w-0 scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full'>
            {props.tasks.map((task,index)=>{
                return (
                <Draggable key={task.task_id} draggableId={task.task_id} index={index}>
                    {(provided)=>{
                        return <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <TaskCard task={task} handleDelete={props.handleDelete}/>
                        </div>
                    }}
                </Draggable>
                )
            })}
            {provided.placeholder}
            </div>)
    }}
      </Droppable>
    </div>
  )
}
