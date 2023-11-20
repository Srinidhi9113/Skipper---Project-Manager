import React,{useState,useEffect} from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import TaskBlock from './TaskBlock'
import supabase from '../../config/supabaseClient'
import { UserPlus } from '@phosphor-icons/react'
import { Tooltip } from 'keep-react'
import AddContributor from './AddContributor'
import ChatBar from './ChatBar'

export default function Body({project,showChat}) {
    // console.log(project)
    const statusList = ["To-Be Done","Ongoing","Review","Completed"]
    const [tasklist,setTasks] = useState()
    const [assignees,setAssignees] = useState()
    const [showSearch,setSearch] = useState(false)

    const toggleSearchState = ()=>{
        setSearch(prev=>!prev)
    }

    const handleNewTask = (task)=>{
        const tempTaskList = tasklist
        tempTaskList[task.project_status].push(task)
        console.log(tempTaskList[task.project_status])
        setTasks(tempTaskList)
    }

    const handleDelete = async(task)=>{
        const tempList = tasklist[task.project_status]
        tempList.splice(tasklist[task.project_status].indexOf(task),1)
        setTasks(prev=>{
            return {...prev,[task.project_status]:tempList}
        })
        const {data,error} = await supabase.from("Tasks").delete().eq("task_id",task.task_id)
        console.log(data)
    }

    const onDragEnd = async(result)=>{
        console.log(result)
        if(result.destination){
            if(result.destination.droppableId === result.source.droppableId){
                const status = result.destination.droppableId 
                const items = Array.from(tasklist[status])
                const [reorderedItem] = items.splice(result.source.index,1)
                items.splice(result.destination.index,0,reorderedItem)
                setTasks(prev=>{
                    return {...prev,[status]:items}
                })
            }
            else{
                const srcstatus = result.source.droppableId 
                const srcitems = Array.from(tasklist[srcstatus])
                const [srcreorderedItem] = srcitems.splice(result.source.index,1)
                const deststatus = result.destination.droppableId
                const destItems = tasklist[deststatus]?Array.from(tasklist[deststatus]):[]
                destItems.splice(result.destination.index,0,srcreorderedItem)
                setTasks(prev=>{
                    return {...prev,[srcstatus]:srcitems,[result.destination.droppableId]:destItems}
                })
                console.log(deststatus)
                const response1 = await supabase.from("Tasks").update({project_status:result.destination.droppableId}).eq('task_id',result.draggableId).select()
                console.log(response1)
            }
        }
    }

    useEffect(()=>{
        const FetchContributors = async()=>{
            const response = await supabase.from("Project").select("project_name,user_id,userDetails(username),role").eq("project_name",project.project_name)
            if(response.data) setAssignees(response.data)
            else console.log(response.error)
        }
        const FetchTasks = async()=>{
            const responses = await supabase.from("Tasks").select("task_id,task_name,comments,assigned_to,project_status").eq("project_id",project.project_id)
            if(responses.data){
                const data = responses.data
                console.log(data)
                const tempTasks = {}
                for(const status of statusList) tempTasks[status] = []
                for(const task of data)tempTasks[task.project_status].push(task)
                setTasks(tempTasks)
            }
            else{
                console.log(responses.error)
            }
        }
        FetchContributors()
        FetchTasks()
    },[project])
  return (
    <div className='flex'>
    <div className='w-full'>
        {showSearch && <AddContributor toggleSearchState={toggleSearchState} project={project}/>}
    <div className='text-white font-primaryFont text-3xl ml-5 my-5 flex flex-row items-center gap-3'>
            {project.project_name}
            <Tooltip
            content="Add Contributors"
            placement='right'
            >
            <UserPlus size={20} weight="fill" className='hover:cursor-pointer' onClick={toggleSearchState} />
            </Tooltip>
        </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 justify-around mt-3'>
        
        <DragDropContext onDragEnd={onDragEnd}>
        {tasklist && statusList.map((status,index)=>{
            return <TaskBlock key={index} title={status} project={project.project_id} contributors={assignees} tasks={tasklist[status]} setTask={handleNewTask} handleDelete={handleDelete}/>
        })}
        </DragDropContext>
    </div>
    </div>
    {showChat && <ChatBar project={project}/>}
    </div>
  )
}
