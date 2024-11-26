'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProjectTypes } from '@/types/main';
import Resources from '../../components/cards/resources';
import CardLoader from '@/components/cards/card-loader';

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectTypes[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filteredProjects, setFilteredProjects] = useState<ProjectTypes[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filterCriteria, setFilterCriteria] = useState<string>('title');
  const [placeholderText, setPlaceholderText] = useState<string>('Search by title...');

  const fetchPublicProject = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/public-project');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data);
      setFilteredProjects(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching public projects:', error);
      toast.error('Failed to fetch projects. Please try again.');
    }
  };

  const handleSearchInput = (searchQuery: string) => {
    setSearch(searchQuery);
    if (!searchQuery) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter((project) => {
      const field = filterCriteria.toLowerCase(); 
      if (field === 'gradelevel') {
        return project.gradeLevel?.toString().includes(searchQuery);
      } else if (field === 'curriculum') {
        return project.curriculum?.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (field === 'objective') {
        return project.objective?.toLowerCase().includes(searchQuery.toLowerCase());
      } else {
        return project.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });

    setFilteredProjects(filtered);
  };

  const handleFilterBy = (val: string) => {
    setPlaceholderText(`Search by ${val}`);
    setFilterCriteria(val.toLowerCase());
    setSearch(''); 
    setFilteredProjects(projects);
  };

  useEffect(() => {
    fetchPublicProject();
  }, []);

  return (
    <>
      {/* Search */}
      <div className="flex-col gap-2 sm:flex-row mt-2 mb-2 flex justify-between">
        <div>
          <input
            className="p-2 rounded-xl border outline-none w-[350px]"
            type="text"
            value={search}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder={placeholderText}
          />
        </div>
        <div className="relative flex gap-2 items-center">
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-sm px-3 py-2 md:px-5 md:py-2.5 text-center inline-flex items-center bg-gray-800 text-white rounded-lg"
            type="button"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter By{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {showFilter && (
            <div
              id="dropdownHover"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 top-[3rem] mt-2"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li onClick={() => handleFilterBy('GradeLevel')}>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Grade Level
                  </a>
                </li>
                <li onClick={() => handleFilterBy('Objective')}>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Objective
                  </a>
                </li>
                <li onClick={() => handleFilterBy('Curriculum')}>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Curriculum
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Projects Display */}
      <div className="auto-fit-card gap-5 mb-[6rem]">
        {loading ? (
          <div className="auto-fit-card gap-5 mb-[6rem]">
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Resources
              id={project.id as string}
              content={project.content}
              key={project.id}
              desc={project.description}
              title={project.title}
              contributors={project.contributors ? project.contributors.length : 0}
              raters={project.ratings ? project.ratings.length : 0}
              tags={project?.tags}
              gradeLevel={project?.gradeLevel}
            />
          ))
        ) : (
          <p className="mt-6 text-center">No resources available</p>
        )}
      </div>
    </>
  );
};

export default Page;
