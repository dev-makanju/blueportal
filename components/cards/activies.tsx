import React from 'react'
import { ProjectTypes } from '@/types/main'
import { useRouter } from 'next/navigation'

interface ActivitiesProps {
    projectId: string;
    project: ProjectTypes;
    content: string;
}

const Activies = ({ projectId, project, content }: ActivitiesProps) => {
    const router = useRouter(); 
    return (
    <div className='flex flex-col gap-4'>
       <div className="flex flex-col md:flex-row md:gap-4 overflow-hidden justify-between md:items-center md:mb-4 border-b-2 w-full border-gray-200 md:pr-8">
            <figure className="flex gap-4 flex-row pl-2 bg-white">    
                <div className="flex flex-col">
                    <div>
                        <h1 className='font-bold'>{project.title}</h1>
                        <small className="text-sm text-gray-500 dark:text-gray-400 ">Lecturer at Harvard</small>
                    </div>
                    <p className="my-4 text-[12px]">{content}</p>
                </div>
            </figure>
            <button onClick={() => router.push(`/library/${projectId}`)} className='bg-gray-800 text-white h-[20px] w-[fit-content] pl-4 pr-4 text-[10px] rounded-lg outline-none'>View more</button>
        </div>
    </div>
  )
}

export default Activies