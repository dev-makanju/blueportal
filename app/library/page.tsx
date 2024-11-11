'use client'
import React, { useEffect, useState } from 'react'
import Resources from '@/components/cards/resources'
import { toast } from "react-toastify"

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState([]);
  const fetchPublicProject = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/public-project')
      if (!res.ok) throw new Error("Failed to fetch projects")
      const data = await res.json()
      setProjects(data)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.error("Error fetching public projects:", error)
      toast.error("Failed to fetch projects. Please try again.")
    }
  }

  useEffect(() => {
    fetchPublicProject()
  }, [])

  return (
    <div className='auto-fit-card gap-5 mb-[6rem]'>
      {loading ? (
        <div className='mt-6 text-center'>
            loading...
        </div>
      ):projects.length > 0 ? (
        projects.map(project => (
          <Resources
            id={project.id}
            desc={project.description}
            title={project.title}
            rating={project.rating || 0}
            tags={project.tags || []}
          />
        ))
      ) : (
        <p className='mt-6 text-center'>No resources available</p>
      )}
    </div>
  )
}

export default Page
