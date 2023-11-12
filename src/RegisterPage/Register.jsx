import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Glow, GlowCapture } from '@codaworks/react-glow'

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
  return (
    <div className='bg-mainBG bg-fixed bg-center bg-cover bg-no-repeat h-screen flex flex-col items-center pt-10'>
      <motion.div variants={heroVariant} className='text-white text-8xl font-primaryFont mb-5'
      initial="initial"
      animate="animate"
      exit="initial"
      >
        Skipper
      </motion.div>
      <GlowCapture>
        <Glow>
      <motion.div variants={animateVariant} className='bg-white bg-opacity-30 p-10 rounded-lg font-primaryFont'
      initial="initial"
      animate="animate"
      exit="initial"
      >
        <motion.div variants={animateVariant} className='text-white md:text-5xl text-3xl mb-5 w-96'>Register...</motion.div>
        <motion.div variants={animateVariant}>
            <label className='text-white md:text-xl text-base'>Username: </label>
            <input className='w-full rounded-full h-8 mb-3 px-3 py-0 opacity-70 focus:outline-none'/><br/>
            <label className='text-white md:text-xl text-base'>Email ID: </label>
            <input className='w-full rounded-full h-8 mb-3 px-3 py-0 opacity-70 focus:outline-none'/><br/>
            <label className='text-white md:text-xl text-base'>Password: </label>
            <input className='w-full rounded-full h-8 px-3 opacity-70 focus:outline-none'/>
        </motion.div>
        <motion.div variants={animateVariant} className="text-white text-center text-xl my-3">OR</motion.div>
            <motion.div variants={animateVariant}><button className='bg-white bg-opacity-80 w-full py-2 rounded-full hover:shadow-lg hover:bg-opacity-100 mb-3'>Register with Google</button></motion.div>
            <motion.div variants={animateVariant}><button className='bg-[#464646] w-full py-2 rounded-full hover:shadow-lg hover:bg-opacity-100 hover:bg-black text-white mb-5'>Register with GitHub</button></motion.div>
            <motion.div variants={animateVariant} className='text-white text-center hover:cursor-pointer'><Link to="/">Already Have an Account??? Sign In...</Link></motion.div>
      </motion.div>
      </Glow>
        </GlowCapture>
    </div>
  )
}
