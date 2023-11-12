import React from 'react'
import Hero from './Components/Hero'
import Input from './Components/Login-input'

export default function Login() {
  return (
    <div className="bg-mainBG bg-fixed bg-center bg-cover bg-no-repeat h-screen flex md:flex-row flex-col p-5 justify-around items-center">
      <Hero/>
      <Input/>
    </div>
  )
}
