"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { useUserStore } from "@/store/useUserStore";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const endUserSession = useUserStore(state => state.endUserSession)
  const setToggle = () => {
    setIsVisible(!isVisible);
  }
  const { name } = useUserStore(state => state);

  const logOut = () => {             
    endUserSession();
    window.location.href = "/sign-in";
  }

  const stripProfileNames = (val: string) => {
    const profile =  val.substring(0,2);
    return profile.toUpperCase();
  }

  return (
    <>
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
                  <Link href="/library" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3 text-white">Library</span>
                  </Link>
                </li>
                <li onClick={() => setIsVisible(!isVisible)}>
                  <Link href="/analysis" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="ms-3 text-white">Analysis</span>
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
                <div className="p-3 font-bold bg-[#FFF] rounded-full border-2">{stripProfileNames(name)}</div>
                <small className="font-bold hidden md:block">{name || ''}</small>
                <div onClick={logOut} className="font-bold cursor-pointer text-red-500">Log out</div>
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
