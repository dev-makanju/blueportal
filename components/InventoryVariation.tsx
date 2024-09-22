import React from 'react'
import Image from 'next/image'

const InventoryVariation = () => {
  return (
    <div className='border rounded-lg'>
        <div className="w-full flex justify-between p-3">
            <div className="flex items-center">
            <div className="ml-2">
                <p className="text-gray-400 text-[12px]">option 1</p>
                <h2 className="tex-black text-sm">Colors</h2>
            </div>
            </div>
            <div className="flex items-center">
            <Image
                src="/svg/more_horiz.svg"
                height={20}
                width={20}
                className="mr-2"
                alt="menu icon"
            />
            </div>
        </div>
        
      <hr/>
      <div className='p-5'>
         <div className='bg-[#eee] pl-2 pr-2 w-[fit-content] flex items-center border rounded-full text-sm'>
            Large &nbsp;
            <span className='cursor-pointer'>X</span>
         </div>
      </div>
      <input  className='border-none pr-5 pl-5 pb-3 text-sm outline-none focus:outline-none bg-none' placeholder='Enter values' type="text" />
    </div>
  )
}

export default InventoryVariation