import React from 'react'
import { motion } from 'framer-motion'

const animateVariant = {
  initial:{
    x:"-100vw",
  },
  animate:{
    x:0,
    transition:{
      delay:0.5,
    }
  }
}

export default function Hero() {
  return (
    <motion.div className='text-white text-center' variants={animateVariant}
    initial="initial"
    animate="animate"
    exit="initial"
    >
        <div className='text-2xl md:text-3xl font-primaryFont'>Welcome to</div>
        <div className='text-5xl md:text-9xl font-primaryFont -mb-5'> Skipper </div><br/>
        <div className='text-3xl md:text-3xl font-primaryFont'>Your Project Tracker</div>
    </motion.div>
  )
}
