'use client'
import React, { useState, useEffect } from 'react';
import Comment from '@/components/comment/Comment';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { UserTypes, ProjectTypes } from '@/types/main';

interface Activities {
  id: string;
  projectId: string; 
  userId: string;  
  user: UserTypes[];
  project: ProjectTypes;
  content: string;   
  createdAt: Date;
}

const Page = () => {
  const { id } = useUserStore(state => state)
  const [selectdViewId, setSelectdViewId] = useState<string>('');
  const [collaborateData, setCollaborateData] = useState<Activities[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [projectIdData , setProjectIdData] = useState<string>('')
  const fetchUserCollabo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/activies/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch lesson plans");
      const data = await response.json();
      setCollaborateData(data);
      if(data.length > 0){
        const firstItem = data.find(() =>  true);
        setSelectdViewId(firstItem?.id);
        setProjectIdData(firstItem?.projectId)
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const setSelected = (id:string, projectId: string) => {
    setSelectdViewId(id)
    setProjectIdData(projectId);
  }

  useEffect(() => {
    fetchUserCollabo()
  },[])

  return (
    <div className="flex flex-col text-white">
      <main className="flex-grow  flex flex-col md:flex-row">
        <section className="md:w-1/2 relative rounded-lg p-4 mb-4 md:mb-0 md:mr-4">
          <Comment projectId={projectIdData} userId={id} showInputField={true}/>
        </section>

        <section className="md:w-1/2 bg-white rounded-lg shadow-md text-gray-800">
          <h2 className="text-xl font-semibold mb-4 pt-5 pl-5 pb-5">Collaborations</h2>
          <div className='mb-5'>
            { isLoading ? (
              <div className='text-center'>
                Fetching collaboratory history
              </div>
            ):(
              <div>
                { collaborateData?.length !== 0 ?  (
                  <div>
                    { collaborateData.map(collabo => (
                        <div key={collabo.id} onClick={() => setSelected(collabo.id, collabo.projectId)} className={`cursor-pointer border-b pb-2 p-5 ${selectdViewId === collabo.id ? 'bg-gray-300' : ''}`}>
                            <h3 className="font-bold text-lg">{collabo.project.title}</h3>
                            <p className="text-gray-600">
                              {collabo.project.description}
                            </p>
                            <small className='text-blue-900 font-bold'>click to see main content</small>
                        </div>
                    ))}
                  </div>
                ): (
                <div>
                  <h2 className="text-center">No collaboratory history</h2>
                </div>
                )} 
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Page