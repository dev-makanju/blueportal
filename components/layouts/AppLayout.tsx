"use client";
import React, { useState } from "react";
import Link from 'next/link';
import Search from "../modals/search";
import Image from "next/image";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => setShowModal(!showModal);
  const setToggle = () => {
    setIsVisible(!isVisible);
  }
  return (
    <>
      <Search showModal={showModal} handleTrigger={toggleModal}/>
      <main className="relative h-screen flex">
          {/* Sidebar */}
          <div className={`fixed top-0  z-40 h-screen p-4 overflow-y-auto transition-transform transform ${ !isVisible ? '-translate-x-full' : 'translate-x-0'} bg-gray-800 w-64`}>
            <h5 id="drawer-navigation-label" className="text-white font-semibold uppercase dark:text-white">
              Blue Portal
            </h5>
            <button
              onClick={() => setIsVisible(!isVisible)}
              aria-controls="drawer-navigation"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            <div className="py-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                <li onClick={() => setIsVisible(!isVisible)}>
                  <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3 text-white">General</span>
                  </Link>
                </li>
                <li onClick={() => setIsVisible(!isVisible)}>
                  <Link href="/collaborate" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3 text-white">Collaborate</span>
                  </Link>
                </li>
                <li onClick={() => setIsVisible(!isVisible)}>
                  <Link href="/analysis" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3 text-white">Analysis</span>
                  </Link>
                </li>
                <li onClick={() => setIsVisible(!isVisible)}>
                  <Link href="/library" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3 text-white">Library</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Content area */}
          <div className="w-full">
            <header className="flex items-center pl-5 pr-5 justify-between p-2 bg-[#eee] w-full">
              <button
                onClick={() => setToggle()}
                className="flex gap-1 flex-col w-[20px] cursor-pointer"
              >
                <div className="bg-gray-800 h-[4px] w-[20px] rounded-lg" />
                <div className="bg-gray-800 h-[4px] w-[20px] rounded-lg" />
                <div className="bg-gray-800 h-[4px] w-[20px] rounded-lg" />
              </button>
              <div className="flex items-center gap-4">      
                <div className="relative flex gap-2 items-center cursor-pointer">
                  <div onClick={() => toggleModal()}>
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 -0.24 28.423 28.423" id="_02_-_Search_Button" data-name="02 - Search Button" xmlns="http://www.w3.org/2000/svg">
                      <path id="Path_215" data-name="Path 215" d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>
                      <path id="Path_216" data-name="Path 216" d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z" transform="translate(-2.31 -2.547)" fill-rule="evenodd"/>
                    </svg>
                  </div>
                  <button
                    id="dropdownHoverButton"
                    data-dropdown-toggle="dropdownHover"
                    data-dropdown-trigger="hover"
                    className="text-wh text-sm px-3 py-2 md:px-5 md:py-2.5 text-center inline-flex items-center bg-gray-800 text-white rounded-lg"
                    type="button"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    Filter{" "}
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
                  { showFilter && (  
                  <div
                    id="dropdownHover"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 top-[3rem] mt-2"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownHoverButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Grade Level
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Objective
                        </a>
                      </li>
                      <li>
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
                <Image   
                  className="w-10 h-10 rounded-full border-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="avatar"
                  width={20}
                  height={20}
                />
                <small className="font-bold hidden md:block">Banji</small>
              </div>
            </header>

            <div className="p-4">
              {children}
            </div>
          </div>
      </main>
    </>
  );
};

export default AppLayout;
