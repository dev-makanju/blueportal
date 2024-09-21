import React, {useState} from 'react'
import Image from 'next/image'

const ScrollWrapper = ({children,renderText}: {children: React.ReactNode; renderText: string;}) => {
    const [showContent , setShowContent] = useState<boolean>(true)
    const handleWrapperScroll = () => {
        setShowContent(!showContent)
    }
    return (
    <div>
       <div className='flex justify-between pb-4 pl-5 pr-5'>
          <h1 className='font-bold text-sm'>{renderText}</h1>
          <button onClick={handleWrapperScroll} className='bg-none outline-none'>
            <Image
                src={"/svg/chevron_down.svg"}
                height={16}
                width={16}
                alt="start icon"
            />
          </button>
       </div>
       <div className={`${showContent ? 'h-[max-content]' : 'h-[0px]'} overflow-hidden ease-in-out duration-300`}>
          {children}
       </div> 
    </div>
  )
}

export default ScrollWrapper