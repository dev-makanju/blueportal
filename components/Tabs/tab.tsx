import React, { useState, useEffect } from "react";
import Activies from "../cards/activies";
import Project from "../cards/project";
import CreateForm from "../modals/CreateForm";
import AssignmentModal from "../modals/AssignmentModal";
import { toast } from "react-toastify";
import { LessonPlanProps } from "@/types/main";

interface TabOptionProps {
  id: number;
  name: string;
}

interface TabOption {
  tabs: TabOptionProps[];
}

const Tab: React.FC<TabOption> = ({ tabs }) => {
  const [currentView, setCurrentView] = useState<string>(tabs[0]?.name || ""); 
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lessonPlans, setLessonPlans] = useState<LessonPlanProps[]>([]);
  const user = localStorage.getItem('appData');
  const appUser = JSON.parse(user as string);

  const handleShowFormModal = () => {
    setShowFormModal(!showFormModal);
  } 
  
  const handleTabOptions = (val: string) => {
    setCurrentView(val);
  };

  const  handleShowAssignmentModal = () => {
    setShowAssignmentModal(!showAssignmentModal);
  }

  const fetchLessonPlans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/plans?userId=${appUser.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error("Failed to fetch lesson plans");
      const data = await response.json();
      setLessonPlans(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === "Lesson Plans") {
      fetchLessonPlans();
    }
  },[currentView])

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
          <div className="flex min-h-[400px] w-full">
            {isLoading ? (
              <p className='text-center'>Loading lesson plans...</p>
            ) : lessonPlans.length > 0 ? (
              <div className="w-full">
                <button
                  onClick={handleShowFormModal}
                  className="bg-gray-800 p-3 text-white rounded-lg float-right"
                >
                  Create a Lesson Plan
                </button>
                {lessonPlans.map((plan) => (
                  <div key={plan?.id} className="p-4 border-b border-gray-300">
                    <h3 className="text-lg font-bold">{plan?.title}</h3>
                    <p>Grade Level: {plan?.gradeLevel}</p>
                    <p>Objectives: {plan?.objectives}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex mt-4 text-center flex-col items-center">
                <p>No Lesson Plans available</p>
              </div>
            )}
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
                <p>No {currentView}</p>
                <button onClick={() => setShowAssignmentModal(!showAssignmentModal)} className='bg-gray-800 mt-[1rem] p-3 outline-none rounded-lg text-white'>Create an {currentView}</button>
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
      <div>
        <CreateForm  showModal={showFormModal} handleTrigger={() => handleShowFormModal()} />
      </div>
      <div>
        <AssignmentModal showModal={showAssignmentModal} handleTrigger={() => handleShowAssignmentModal()} />
      </div>
    </div>
  );
};

export default Tab;
