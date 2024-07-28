import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Glow, GlowCapture } from '@codaworks/react-glow'

import supabase from '../config/supabaseClient'

const heroVariant = {
    initial:{
      y:"-100vh",
    },
    animate:{
      y:0,
      transition:{
        delay:0.5,
      }
    }
  }

const animateVariant = {
    initial:{
      opacity:0
    },
    animate:{
      opacity:1,
      transition:{
        duration:1,
        delayChildren:0.5,
        staggerChildren:0.5
      }
    }
  }

export default function Register() {
  const [userName,setUserName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [error,setError] = useState(false)
  const navigate = useNavigate()
  const handleEmailRegister = async ()=>{
    if(!userName | !email | !password){
      setError("Please make sure you have entered all the details")
    }
    else{
      const checkUsername = await supabase.from("userDetails").select().eq("username",userName)
      if(checkUsername.data.length===0){
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password
        })
        if(error){
          setError(error.message)
        }
        else{
          const response = await supabase.from('userDetails').update({username:userName,email_id:email}).eq("user_id",data.user.id).select()
          // const response = await supabase.from('userDetails').select().eq("user_id",data.user.id)
          // console.log(response.data)
          if(!response.error) navigate("/dashboard")
          else setError(error.text)
        }
      }
    else{
      setError("Username already exists")
    }
  }
  }
  return (
    <div className='bg-mainBG bg-fixed bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center min-h-screen pb-3'>
      <motion.div variants={heroVariant} className='text-white md:text-11xl text-6xl font-primaryFont mb-5'
      initial="initial"
      animate="animate"
      exit="initial"
      >
        Skipper
      </motion.div>
      <GlowCapture>
        <Glow>
      <motion.div variants={animateVariant} className='bg-white bg-opacity-30 px-10 py-7 rounded-lg font-primaryFont'
      initial="initial"
      animate="animate"
      exit="initial"
      >
        <motion.div variants={animateVariant} className='text-white md:text-5xl text-3xl mb-1 md:w-96'>Register...</motion.div>
        <span className='text-sm' style={{visibility:error?"visible":"hidden"}}>*({error})</span>
        <motion.div variants={animateVariant}>
            <label className='text-white md:text-xl text-base'>Username: </label>
            <input className='w-full rounded-full h-8 mb-3 px-3 py-0 opacity-70 focus:outline-none' onChange={(event)=>{setUserName(event.target.value)}}/><br/>
            <label className='text-white md:text-xl text-base'>Email ID: </label>
            <input className='w-full rounded-full h-8 mb-3 px-3 py-0 opacity-70 focus:outline-none' onChange={(event)=>setEmail(event.target.value)}/><br/>
            <label className='text-white md:text-xl text-base'>Password: </label>
            <input type='password' className='w-full rounded-full h-8 px-3 opacity-70 focus:outline-none' onChange={(event)=>setPassword(event.target.value)}/>
            <div className='flex justify-center items-center'><button className='py-2 px-3 text-2xl bg-[#000336] text-white rounded-xl bg-opacity-80 my-3' onClick={handleEmailRegister}>Register</button></div>
        </motion.div>
        <motion.div variants={animateVariant} className="text-white text-center text-xl my-3">OR</motion.div>
            {/* <motion.div variants={animateVariant}><button className='bg-white bg-opacity-80 w-full py-2 rounded-full hover:shadow-lg hover:bg-opacity-100 mb-3'>Register with Google</button></motion.div>
            <motion.div variants={animateVariant}><button className='bg-[#464646] w-full py-2 rounded-full hover:shadow-lg hover:bg-opacity-100 hover:bg-black text-white mb-5'>Register with GitHub</button></motion.div> */}
            <motion.div variants={animateVariant} className='text-white text-center hover:cursor-pointer'><Link to="/">Already Have an Account??? Sign In...</Link></motion.div>
      </motion.div>
      </Glow>
        </GlowCapture>
    </div>
  )
}
