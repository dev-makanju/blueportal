import React, { useState } from "react";
import Activies from "../cards/activies";
import Project from "../cards/project";

interface TabOptionProps {
  id: number;
  name: string;
}

interface TabOption {
  tabs: TabOptionProps[];
}

const Tab: React.FC<TabOption> = ({ tabs }) => {
  const [currentView, setCurrentView] = useState<string>(tabs[0]?.name || ""); // Default to the first tab

  const handleTabOptions = (val: string) => {
    setCurrentView(val);
  };

  return (
    <div>
      <div className="mb-4 border-b-2 border-gray-200">
        <ul
          className="flex overflow-x-auto -mb-px text-sm font-medium text-center"
          id="default-styled-tab"
          data-tabs-toggle="#default-styled-tab-content"
          role="tablist"
        >
          {tabs?.map((tab) => (
            <li className="mr-2 min-w-[fit-content]" role="presentation" key={tab.id}>
              <button
                onClick={() => handleTabOptions(tab.name)}
                className={`inline-block p-4 border-b-2 ${
                  currentView === tab.name ? "border-gray-800" : ""
                } border-transparent rounded-t-lg hover:border-gray-800`}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-controls={`content-${tab.id}`}
                aria-selected={currentView === tab.name}
              >
                {tab.name.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="default-styled-tab-content">
        {currentView === "Lesson Plans" && (
          <div className="flex justify-center items-center min-h-[400px] w-full">
            <div className='flex flex-col items-center'>  
                <p>No {currentView} </p>
                <button className='bg-gray-800 mt-[1rem] p-3 outline-none rounded-lg text-white'>Create a {currentView}</button>
            </div>
          </div>
        )}
        {currentView === "Activities" && (
          <div className="flex justify-center items-center min-h-[400px] w-full">
            <div className='flex hidden flex-col items-center'>  
                <p>No {currentView} </p>
                <button className='bg-gray-800 mt-[1rem] p-3 outline-none rounded-lg text-white'>Create an {currentView}</button>
            </div> 
            <div className="w-full">
                <Activies/>
            </div>
          </div>
        )}
        {currentView === "Assignments" && (
          <div className="flex justify-center items-center min-h-[400px] w-full">
             <div className='flex flex-col items-center'>  
                <p>No {currentView} </p>
                <button className='bg-gray-800 mt-[1rem] p-3 outline-none rounded-lg text-white'>Create an {currentView}</button>
            </div>
          </div>
        )}
        {currentView === "Project" && (
          <div className="flex justify-center items-center min-h-[400px] w-full">
              <div className='flex hidden flex-col items-center'>  
                <p>No {currentView} </p>
                <button className='bg-gray-800 mt-[1rem] p-3 outline-none rounded-lg text-white'>Create a {currentView}</button>
              </div>
              <div className="w-full">
                <Project/>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
