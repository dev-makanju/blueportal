'use client'
import React from 'react';
import { jsPDF } from "jspdf";
import { stringToSlug, truncateText} from '@/utils/utililty';
import Link from 'next/link';

interface resourceProps {
    id: number,
    title: string,
    desc: string,
    rating: number,
    tags: string[]
}

const Resources = ({
   id,
   title,
   desc,
   rating,
   tags 
}: resourceProps) => { 
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
    
        lines.forEach((line) => {
            if (cursorY + lineHeight > pageHeight - margin) {
                doc.addPage(); 
                cursorY = startY; 
            }
            doc.text(line, startX, cursorY);
            cursorY += lineHeight; 
        });
    
        doc.save(`${stringToSlug(title)}.pdf`);
    };
    
      
    return (
     <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <h1 className='p-3 text-3xl font-bold'>{title}</h1>
        <div className="p-3">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncateText(desc, 70)}</p>
        <div className='flex mt-3 gap-1'>
           <span>{rating}/5</span>
           <span className="text-gold">★</span> 
        </div>
        <div className='flex mt-3 gap-2'>
            { tags?.map((tag, _) => (
                <span key={_} className='bg-gray-800 p-1 rounded-lg text-white'>{tag}</span>
            ))}         
        </div>
        <div className='flex mt-3'>
            <Link className='flex-1 border text-center text-[12px] p-2 text-gray hover:bg-gray-800 hover:text-white' href={`/library/${stringToSlug(title)}`}>
               remix
            </Link>
            <button className='flex-1 border text-[12px] p-2 hover:text-white hover:bg-gray-800' onClick={() => downLoadResourseAsPDF(title, desc)}>download</button>
        </div>
        </div>
    </div>
  )
}

export default Resources