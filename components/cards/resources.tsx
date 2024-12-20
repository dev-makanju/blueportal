'use client'
import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { stringToSlug, truncateText} from '@/utils/utililty';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { toast } from "react-toastify";

interface resourceProps {
    id: string,
    title: string,
    desc: string,
    rating?: number,
    raters: number,
    contributors: number,
    content: string,
    tags: string,
    gradeLevel: string,
    useDelete?: boolean,
}

const Resources = ({
   id,
   title,
   desc,
   tags,
   raters,
   contributors,
   content,
   gradeLevel,
   useDelete
}: resourceProps) => { 
    const {id: userId, role } = useUserStore(state => state)
    const [downloads , setDownloads] = useState<number>(0);
    const [isDeleting, setIsDeleting ] = useState<boolean>(false);
    const updateDownloadCount = async () => {
        try{
            const response = await fetch('/api/download/click', {
              method: 'POST',
              headers: {
                'Content-Type':'application/json',
              },
              body: JSON.stringify({
                projectId: id,
                userId: userId
              })
            })
            if(response) {
                setDownloads( Number(downloads) + 1);
            }
        }catch(err){
            console.error(err);
        }
    }

    const downLoadResourseAsPDF = (title: string, document: string) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",            
            format: "A4" 
        });
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40; 
        const textWidth = pageWidth - margin * 2;
        const startX = margin;
        const startY = margin;
        const lineHeight = 20; 
    
        const lines = doc.splitTextToSize(document, textWidth);
        let cursorY = startY;
    
        lines.forEach((line: string) => {
            if (cursorY + lineHeight > pageHeight - margin) {
                doc.addPage(); 
                cursorY = startY; 
            }
            doc.text(line, startX, cursorY);
            cursorY += lineHeight; 
        });
    
        doc.save(`${stringToSlug(title)}.pdf`);
        updateDownloadCount()
    };

    const fetchDownloads = async () => {
        try {
            const response = await fetch(`/api/download?projectId=${id}`);
            const data = await response.json();
            if(response) {
               setDownloads(data.length);
            }
        }catch(err){
          console.error(err);
        }
    }

    const deleteProject = async (projectId: string) => {
        setIsDeleting(true)
        try {
          const response = await fetch(`/api/project/delete?_id=${projectId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            toast.success('Project deleted successfully!');
            window.location.reload();
            setIsDeleting(false)
          } else {
            setIsDeleting(false)
            const errorData = await response.json();
            toast.error(`Failed to delete project: ${errorData.message}`);
          }
        } catch (err) {
          console.error(err);
          setIsDeleting(false)
          toast.error('An error occurred while deleting the project.');
        }
    };
      

    useEffect(() => {
        fetchDownloads();
    }, [])
    
    return (

     <div key={id} className="sm:max-w-[350px] bg-white border h-[350px] border-gray-200 rounded-lg shadow relative">
        <h1 className='p-3 text-2xl mb-2 font-bold'>{truncateText(title, 45)}</h1>
        <div className='absolute bottom-0 right-0 left-0 border-2'>   
            <div className="p-3 h-[250px] relative">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncateText(desc, 35)}</p>
                <div className='mt-2'>
                    <p className='text-sm'>{raters} ratings , {contributors} contributors , {downloads} downloads</p> 
                </div>
                <div className='mt-2'>
                    <p className='text-sm'>grade {gradeLevel}</p> 
                </div>
                <div className='flex mt-3 gap-2'>
                    { tags.split(',').map((tag, _) => (
                        <span key={_} className='bg-gray-800 p-1 rounded-lg text-white'>{tag}</span>
                    ))}         
                </div>
                { useDelete && useDelete ? (
                    <button className='flex-1 border text-[12px] p-1 rounded-lg text-white bg-red-400 mt-2' onClick={() => deleteProject(id)}>
                       {isDeleting ? 'deleting project' : 'delete project'} 
                    </button>
                ) :  null}
                <div className='flex mt-3 absolute bottom-2 right-0 left-0'>
                    <Link className='flex-1 border text-center text-[12px] p-2 text-gray hover:bg-gray-800 hover:text-white' href={`/library/${id}`}>
                      {role === "LECTURER" ? 'remix' : 'view'}
                    </Link>  
                    <button className='flex-1 border text-[12px] p-2 hover:text-white hover:bg-gray-800' onClick={() => downLoadResourseAsPDF(title, content)}>download</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Resources