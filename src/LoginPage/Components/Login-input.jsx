import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlowCapture,Glow } from '@codaworks/react-glow'

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

export default function Input() {
  return (
    <motion.div className='flex justify-center items-center' variants={animateVariant}
    initial="initial"
    animate="animate"
    exit="initial"
    >
      <GlowCapture>
        <Glow>
        <div className='bg-white bg-opacity-30 p-10 rounded-lg font-primaryFont'>
          <motion.div className='text-white md:text-5xl text-3xl mb-5' variants={animateVariant}>Login...</motion.div>
          <motion.div variants={animateVariant}>
            <label className='text-white md:text-xl text-base'>Username or Email ID: </label>
            <input className='w-full rounded-full h-8 mb-3 px-3 py-0 opacity-70 focus:outline-none'/><br/>
            <label className='text-white md:text-xl text-base'>Password: </label>
            <input className='w-full rounded-full h-8 px-3 opacity-70 focus:outline-none'/>
          </motion.div>
            <motion.div variants={animateVariant} className="text-white text-center text-xl my-3">OR</motion.div>
            <motion.div variants={animateVariant}><button className='bg-white bg-opacity-80 w-full py-2 rounded-full hover:shadow-lg hover:bg-opacity-100 mb-3'>Register with Google</button></motion.div>
            <motion.div variants={animateVariant}><button className='bg-[#464646] w-full py-2 rounded-full hover:shadow-lg hover:bg-opacity-100 hover:bg-black text-white mb-5'>Register with GitHub</button></motion.div>
            <motion.div variants={animateVariant} className='text-white text-center hover:cursor-pointer'><Link to="/register">Don't Have an Account??? Sign Up...</Link></motion.div>
        </div>
        </Glow>
        </GlowCapture>
      </motion.div>
  )
}
