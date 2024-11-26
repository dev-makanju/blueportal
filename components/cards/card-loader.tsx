import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardLoader = () => {
  return (
    <div className='bg-white border h-[350px] border-gray-200 rounded-lg shadow relative'>
        <Skeleton count={14}/>
    </div>
  )
}

export default CardLoader