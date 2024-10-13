import React from 'react'
import Image from 'next/image'

const Activies = () => {
  return (
    <div className='flex flex-col gap-4'>
       <div className="flex flex-col md:flex-row md:gap-4 overflow-hidden justify-between md:items-center md:mb-4 border-b-2 w-full border-gray-200 md:pr-8">
            <figure className="flex gap-4 flex-row pl-2 bg-white">
                <figcaption className="flex flex-col items-center">
                    <Image className="rounded-full w-9 h-9" height={30} width={30} src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
                </figcaption>    
                <div className="flex flex-col">
                    <div>
                        <h1 className='font-bold'>Bonnie Green</h1>
                        <small className="text-sm text-gray-500 dark:text-gray-400 ">Lecturer at Harvard</small>
                    </div>
                    <p className="my-4 text-[12px]">If you care for your time, I hands down would go</p>
                </div>
            </figure>
            <button className='bg-gray-800 text-white h-[20px] w-[fit-content] pl-4 pr-4 text-[10px] rounded-lg outline-none'>View more</button>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 overflow-hidden justify-between md:items-center md:mb-4 border-b-2 w-full border-gray-200 md:pr-8">
            <figure className="flex gap-4 flex-row pl-2 bg-white">
                <figcaption className="flex flex-col items-center">
                    <Image height={30} width={30} className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
                </figcaption>    
                <div className="flex flex-col">
                    <div>
                        <h1 className='font-bold'>Bonnie Green</h1>
                        <small className="text-sm text-gray-500 dark:text-gray-400 ">Lecturer at Harvard</small>
                    </div>
                    <p className="my-4 text-[12px]">If you care for your time, I hands down would go</p>
                </div>
            </figure>
            <button className='bg-gray-800 text-white h-[20px] w-[fit-content] pl-4 pr-4 text-[10px] rounded-lg outline-none'>View more</button>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 overflow-hidden justify-between md:items-center md:mb-4 border-b-2 w-full border-gray-200 md:pr-8">
            <figure className="flex gap-4 flex-row pl-2 bg-white">
                <figcaption className="flex flex-col items-center">
                    <Image height={30} width={30} className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
                </figcaption>    
                <div className="flex flex-col">
                    <div>
                        <h1 className='font-bold'>Bonnie Green</h1>
                        <small className="text-sm text-gray-500 dark:text-gray-400 ">Lecturer at Harvard</small>
                    </div>
                    <p className="my-4 text-[12px]">If you care for your time, I hands down would go</p>
                </div>
            </figure>
            <button className='bg-gray-800 text-white h-[20px] w-[fit-content] pl-4 pr-4 text-[10px] rounded-lg outline-none'>View more</button>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 overflow-hidden justify-between md:items-center md:mb-4 border-b-2 w-full border-gray-200 md:pr-8">
            <figure className="flex gap-4 flex-row pl-2 bg-white">
                <figcaption className="flex flex-col items-center">
                    <Image height={30} width={30} className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
                </figcaption>    
                <div className="flex flex-col">
                    <div>
                        <h1 className='font-bold'>Bonnie Green</h1>
                        <small className="text-sm text-gray-500 dark:text-gray-400 ">Lecturer at Harvard</small>
                    </div>
                    <p className="my-4 text-[12px]">If you care for your time, I hands down would go</p>
                </div>
            </figure>
            <button className='bg-gray-800 text-white h-[20px] w-[fit-content] pl-4 pr-4 text-[10px] rounded-lg outline-none'>View more</button>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 overflow-hidden justify-between md:items-center md:mb-4 border-b-2 w-full border-gray-200 md:pr-8">
            <figure className="flex gap-4 flex-row pl-2 bg-white">
                <figcaption className="flex flex-col items-center">
                    <Image height={30} width={30} className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
                </figcaption>    
                <div className="flex flex-col">
                    <div>
                        <h1 className='font-bold'>Bonnie Green</h1>
                        <small className="text-sm text-gray-500 dark:text-gray-400 ">Lecturer at Harvard</small>
                    </div>
                    <p className="my-4 text-[12px]">If you care for your time, I hands down would go</p>
                </div>
            </figure>
            <button className='bg-gray-800 text-white h-[20px] w-[fit-content] pl-4 pr-4 text-[10px] rounded-lg outline-none'>View more</button>
        </div>
    </div>
  )
}

export default Activies