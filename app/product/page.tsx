'use client';
import { useProductStore } from '../_store';

export default function Page() {
    const { id,someData, update  } = useProductStore((state) => state);  
    return (
        <main className="flex flex-col gap-4 items-center justify-center min-h-screen">
         <h1>
            <span className='text-4xl font-bold'>{`my id is ${id} and ${someData}`}</span>
         </h1>
 
         <div className="flex gap-2">
             <button onClick={update} className="border border-white p-1.5 font-medium rounded-md">
               get store data
             </button>
         </div>
        </main>
    );
};