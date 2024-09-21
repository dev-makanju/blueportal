import React from 'react'
import Input from '../Input'

const Step1 = () => {
  return (
    <div className='p-5 flex flex-col gap-5'>
        <h1 className='font-bold text-2xl text-black' >Enter your phone number or email to get started</h1>
        <p className='text-gray-400	 text-[14px]'>We will send you a verification code for confirmation</p>
        <Input inputType='text' inputName='emailphone' holderText='Enter phone number or email'/>
    </div>
  )
}

export default Step1