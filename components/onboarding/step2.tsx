import React from 'react'
import Input from '../Input'
import Image from 'next/image'

const Step2 = () => {
  return (
    <div className='p-5 flex flex-col gap-5'>
        <h1 className='font-bold text-2xl text-black' >Complete profile setup</h1>
        <p className='text-gray-400	 text-[14px]'>Connect your socials for quick setup</p>
        <div className='flex flex-row gap-4'>
           <div className='bg-[#eee] rounded-lg p-5 flex-1 flex justify-center'>
                <Image
                  src={"/svg/Instagram.svg"}
                  height={20}
                  width={20}
                  alt="start icon"
                />
           </div>
           <div className='bg-[#eee] rounded-lg p-5 flex-1 flex justify-center'>
                <Image
                  src={"/svg/TikTok.svg"}
                  height={20}
                  width={20}
                  alt="start icon"
                />
           </div>
           <div className='bg-[#eee] rounded-lg p-5 flex-1 flex justify-center'>
                <Image
                  src={"/svg/Google.svg"}
                  height={20}
                  width={20}
                  alt="start icon"
                />
           </div>
        </div>
        <p className='text-gray-400	 text-[14px]'>Or enter manually</p>
        <div className='flex flex-col gap-4'>
           <Input inputType='text' inputName='name' holderText='Full name'/>
           <Input inputType='text' inputName='username' holderText='Username'/>
           <Input inputType='phone' inputName='number' holderText='Phone number'/>
           <Input inputType='email' inputName='email' holderText='Email'/>
        </div>
    </div>
  )
}

export default Step2