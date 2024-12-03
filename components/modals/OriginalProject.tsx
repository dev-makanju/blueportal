import React from 'react'
import { stringToSlug } from '@/utils/utililty';
import OriginalReview from '../review/OriginalReview';
import { jsPDF } from "jspdf";

interface ContentProps {
    id: string;
    userId: string;
    title: string;
    projectContent: string;
    showModal: boolean;
    handleTrigger: () => void;
}

const OriginalProject = ({id, userId, showModal, title , projectContent, handleTrigger}: ContentProps) => {
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

            if(response) return;
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

   return (
    <div>
        {showModal && (
            <div className='fixed inset-0 z-50 flex items-center overflow-auto justify-center bg-black bg-opacity-50'>
                <div className='bg-white p-8 rounded-lg w-full max-w-md h-[550px] overflow-auto no-scrollbar'>
                    <div className='w-full flex gap-2'>
                        <button  onClick={() => downLoadResourseAsPDF(title, projectContent)} className='border-2 flex-1 bg-gray-800 outline-none rounded-lg p-1 text-white'>
                            Download
                        </button>
                        <button onClick={handleTrigger} className='border-2 flex-1 bg-gray-400 outline-none rounded-lg p-1 text-white'>
                            Close modal
                        </button>
                    </div>
                    <hr className='mt-2'/>
                    <div className='w-full flex gap-2'>
                        <OriginalReview />
                    </div>
                    <hr className='mt-2'/>
                    <h1 className='text-[30px] leading-60 font-bold'>{title}</h1>
                    <div className='mt-[1rem]'>{ projectContent }</div> 
                </div>
            </div>
        )}
    </div>
  )
}

export default OriginalProject