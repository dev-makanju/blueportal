import React from 'react'
import Resources from '@/components/cards/resources'
import { RESOURCES } from '@/utils/constant'

const page = () => {
  return (
    <div className='auto-fit-card gap-5  mb-[6rem]'>
      {  
        RESOURCES.map(resource => (
          <Resources
            key={resource.id}
            desc={resource.description}
            title={resource.title}
            rating={resource.rating}
            tags={resource.tags}
          />
        ))
      }
    </div>
  )
}

export default page