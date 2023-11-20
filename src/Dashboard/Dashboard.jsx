import React,{useState,useEffect} from 'react'
import SideBar from './Components/SideBar'
import TopBar from './Components/TopBar'
import Body from './Components/Body'

export default function Dashboard() {
  const [currProject,setProject] = useState()
  const [showChat,setShowChat] = useState(false)

  const toggleShowChat = ()=>{
    setShowChat(prev=>!prev)
  }
  const handleProjectSelection = (project)=>{
    setProject(project)
  }
  return (
    <div className='bg-mainBG bg-fixed bg-center bg-cover bg-no-repeat h-screen w-screen min-h-screen p-1 flex flex-row'>
      <SideBar selectProject={handleProjectSelection}/>
      
    <div className='w-full ml-1 flex flex-col overflow-auto'>
      <TopBar project={currProject} toggleShowChat={toggleShowChat}/>
      {currProject && <Body project={currProject} showChat={showChat}/>}
    </div>
    </div>
  )
}
