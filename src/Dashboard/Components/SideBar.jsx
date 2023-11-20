import React, { useEffect, useState } from 'react'
import {List,XCircle,Kanban,PlusSquare} from '@phosphor-icons/react'
import { Tooltip } from 'keep-react'
import supabase from '../../config/supabaseClient'

export default function SideBar({selectProject}) {
  const [isOpen,toggleOpen] = useState(false)
  const [showForm,setShowForm] = useState(false)
  const [newProject,setProject] = useState()
  const [projectList,setProjectList] = useState()
  const [error,setError] = useState()
  const [user,setUser] = useState()

  useEffect(()=>{
    const FetchProjects = async()=>{
      const {data,error} = await supabase.auth.getUser()
      if(data){
        const user_id = data.user.id
        setUser(user_id)
        const response = await supabase.from("Project").select("project_id,project_name").or(`owner_id.eq.${user_id},user_id.eq.${user_id}`)
        if(response.data){
          // console.log(response.data)
          setProjectList(response.data)
        }
        else{
          console.log(error)
        }
      }}
      FetchProjects()
  })
  const parentStyle = {
    width:isOpen?'14rem':'3.5rem',
    transition: 'all 0.5s',
    transitionTimingFunction:"ease"
  }

  const createNewProject = async ()=>{
    if(!newProject){
      setError("Enter a project name")
    }else{
      const exists = await supabase.from('Project').select().match({project_name:newProject,owner_id:user})
      if(exists.data.length===0){
      const {data,error} = await supabase.from('Project').insert({project_name:newProject,owner_id:user,user_id:user,role:"owner"}).select("project_id,project_name")
      if(data){
        const newList = Array.from(projectList)
        newList.push(...data)
        setProjectList(newList)
        setError(false)
        setShowForm(false)
        setProject("")
      }
      else{
        console.log(error)
      }
    }
    else{
      setError("Project Name already exists")
    }
    }
  }


  return (
    <div className='bg-white bg-opacity-30 h-full rounded-xl flex flex-col items-start pt-4 overflow-hidden z-50' style={parentStyle}>
      {showForm && 
      <div className='absolute top-10 left-1/2 -translate-x-1/2 bg-sky-50 rounded-lg w-1/3 p-5'>
        <XCircle size={32} weight="fill" color="rgb(8 51 68)" className='hover:cursor-pointer z-50 absolute top-3 right-3' onClick={()=>setShowForm(false)}/>
        <div className='text-3xl font-primaryFont text-sky-900'> Add a New Project...{error && <span className='text-sm font-primaryFont text-red-600'> *({error})</span>}</div>
        <div>
          <label className='text-lg font-primaryFont text-sky-900'>Project Name: </label><input className='bg-opacity-50 bg-sky-300 rounded-lg w-full p-1 px-2 focus:outline-none font-primaryFont' onChange={(e)=>{setProject(e.target.value);setError("")}}/>
          <div className='flex justify-center items-center my-5'><button className='rounded-lg px-5 py-2 text-lg font-primaryFont text-white bg-sky-900' onClick={createNewProject}>Create</button></div>
        </div>
      </div>
      }
      {!isOpen && <List size={32} weight='fill' color="white" className='hover:cursor-pointer mb-4 mx-3' onClick={()=>{toggleOpen(prev=>!prev)}}/>}
      {isOpen && <div className='flex flex-row w-full mb-4 mx-3'>
        <XCircle size={32} weight="fill" color="white" className='hover:cursor-pointer' onClick={()=>{toggleOpen(prev=>!prev)}}/>
        <div className='text-2xl font-primaryFont text-white text-center ml-3'>Projects</div>
      </div>}
<div className='w-full h-1/2 overflow-y-auto overflow-x-hidden scrollbar-none'>
      {projectList && projectList.map(({project_name,project_id})=>{
        return <div className='hover:bg-white hover:bg-opacity-20 my-4 rounded-lg p-1 ml-2 flex flex-row w-full overflow-clip hover:cursor-pointer h-20' key={project_id} onClick={()=>{selectProject({project_name,project_id})}}>
          <Tooltip
          content={project_name}
          trigger="hover"
          placement="right"
          animation="duration-300"
          style="dark"
          >
            <Kanban size={32} weight="fill" color="white" className='hover:cursor-pointer' />
            </Tooltip>
          <div className='ml-3 text-xl text-white font-primaryFont w-fit truncate overflow-hidden'>{project_name}</div>
        </div>
      })}
</div>
      <div className='hover:bg-white hover:bg-opacity-20 my-4 rounded-lg p-1 ml-2 flex flex-row w-full overflow-clip hover:cursor-pointer h-20' onClick={()=>{setShowForm(true);}}>
      <Tooltip
          content="Add new project"
          trigger="hover"
          placement="right"
          animation="duration-300"
          style="dark"
          >
        <PlusSquare size={32} weight="fill" color="white" className='hover:cursor-pointer'/>
        </Tooltip>
        <div className='ml-3 text-xl text-white font-primaryFont w-20 overflow-hidden'>Add a new project</div>
        </div>

    </div>
  )
}
