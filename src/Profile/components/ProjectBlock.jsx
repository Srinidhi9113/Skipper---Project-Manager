import React, { useEffect, useState } from 'react'
import supabase from '../../config/supabaseClient'

export default function ProjectBlock({user}) {
  const [projects,setProjects] = useState()
  useEffect(()=>{
    const GetProjects = async()=>{
      const projectsRes = await supabase.from("Project").select("project_id,project_name,role").eq("user_id",user.user_id)
      if(projectsRes.data) setProjects(projectsRes.data)
      else console.log(projectsRes.error)
    }
    GetProjects()
  },[])
  return (
    <div className='w-full h-fit bg-white bg-opacity-30 rounded-md py-3 px-5 flex flex-col'>
      <div className='text-black text-4xl font-primaryFont'>Projects...</div>
      <div className='flex w-full gap-3'>
        <div className='basis-1/2 h-72 bg-white bg-opacity-50 rounded-lg p-2 flex flex-col'>
          <div className='text-black font-primaryFont text-lg'>Your Projects...</div>
          <div className='flex flex-col overflow-auto w-full h-full gap-3 scrollbar-none'>
            {projects && projects.map((project,index)=>{
              if(project.role==="owner"){
                return <div className='w-full rounded-md bg-white bg-opacity-70 p-2' key={index}>
                  
                  <div className='text-black font-primaryFont text-base'>{project.project_id}</div>
                  <div className='text-black font-primaryFont text-xl'><span className='font-bold'>Project Name: </span>{project.project_name}</div>
                </div>
              }
            })}
          </div>
        </div>
        <div className='basis-1/2 h-72 bg-white bg-opacity-50 rounded-lg p-2 flex flex-col'>
          <div className='text-black font-primaryFont text-lg'>Contributing in...</div>
          <div className='flex flex-col overflow-auto w-full h-full gap-3 scrollbar-none'>
            {projects && projects.map((project,index)=>{
              if(project.role!=="owner"){
                return <div className='w-full rounded-md bg-white bg-opacity-70 p-2' key={index}>
                  
                  <div className='text-black font-primaryFont text-base'>{project.project_id}</div>
                  <div className='text-black font-primaryFont text-xl'><span className='font-bold'>Project Name: </span>{project.project_name}</div>
                </div>
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
