"use client";
import React, { useState, useEffect } from "react";
import Activies from "../cards/activies";
import CreateForm from "../modals/CreateForm";
import AssignmentModal from "../modals/AssignmentModal";
import ProjectModal from "../modals/ProjectModal";
import { toast } from "react-toastify";
import { LessonPlanProps, AssignmentTypes, ProjectTypes, UserTypes } from "@/types/main";
import { useUserStore } from "@/store/useUserStore";
import Resources from "@/components/cards/resources";

interface TabOptionProps {
  id: number;
  name: string;
}

interface Activities {
  id: string;
  projectId: string; 
  userId: string;  
  user: UserTypes[];
  project: ProjectTypes;
  content: string;   
  createdAt: Date;
}

interface TabOption {
  tabs: TabOptionProps[];
}

const Tab: React.FC<TabOption> = ({ tabs }) => {
  const [currentView, setCurrentView] = useState<string>(tabs[0]?.name || "");
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [lessonPlans, setLessonPlans] = useState<LessonPlanProps[]>([]);
  const [projects, setProjects] = useState<ProjectTypes[]>([]);
  const [assignments, setAssignments] = useState<AssignmentTypes[]>([]);
  const [activities , setActivities] = useState<Activities[]>([]);
  const { id } = useUserStore((state) => state);

  const handleShowFormModal = () => {
    setShowFormModal(!showFormModal);
  };

  const handleTabOptions = (val: string) => {
    setCurrentView(val);
  };

  const handleShowProjectModal = () => {
    setShowProjectModal(!showProjectModal);
  };

  const handleShowAssignmentModal = () => {
    setShowAssignmentModal(!showAssignmentModal);
  };

  const fetchLessonPlans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/plans?userId=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch lesson plans");
      const data = await response.json();
      setLessonPlans(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/assignment?userId=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch lesson plans");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/project?userId=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch lesson plans");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyActivites = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/activies?userId=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch lesson plans");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    if (currentView === "Lesson Plans") {
      fetchLessonPlans();
    } else if (currentView === "Project") {
      fetchMyProjects();
    } else if (currentView === "Assignments") {
      fetchAssignments();
    }else if(currentView === "Activities"){
      fetchMyActivites();
    }
  }, [currentView, id]);

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
            <li
              className="mr-2 min-w-[fit-content]"
              role="presentation"
              key={tab.id}
            >
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
          <div className="flex min-h-[400px] w-full flex-col">
            <button
              onClick={handleShowFormModal}
              className="bg-gray-800 p-3 text-white rounded-lg w-[200px] float-right"
            >
              Create a Lesson Plan
            </button>
            {isLoading ? (
              <div className="flex mt-4 text-center flex-col items-center">
                <p>Fetching lesson plans...</p>
              </div>
            ) : lessonPlans.length > 0 ? (
              <div className="w-full flex flex-wrap gap-4">
                {lessonPlans.map((plan) => (
                  <div key={plan?.id} className="p-6 mt-5 border w-full sm:w-[48%] h-[450px] overflow-y-auto border-gray-300 rounded-lg bg-white shadow-sm">
                    <h3 className="text-lg font-bold">{plan?.title}</h3>
                    <div className="text-sm text-gray-500 mb-4">
                      <p>
                        Grade Level:{" "}
                        <span className="font-medium text-gray-700">
                          {plan?.gradeLevel}
                        </span>
                      </p>
                      <p>Objectives:</p>
                      <ul className="list-disc list-inside text-gray-600 mt-1">
                        {plan?.objectives
                          ?.split(". ")
                          .map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                      </ul>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      <p className="font-medium text-gray-700">Materials:</p>
                      <p className="text-gray-600">{plan?.materials}</p>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      <p className="font-medium text-gray-700">
                        Lesson Phases:
                      </p>
                      <p className="text-gray-600">{plan?.lessonPhases}</p>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      <p className="font-medium text-gray-700">Assessment:</p>
                      <p className="text-gray-600">{plan?.assessment}</p>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      <p className="font-medium text-gray-700">Reflection:</p>
                      <p className="text-gray-600">{plan?.reflection}</p>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                      Created on: {new Date(plan?.date).toLocaleDateString()}
                    </p>
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
            <div className="flex hidden flex-col items-center">
              <p>No {currentView} </p>
              <button className="bg-gray-800 mt-[1rem] p-3 outline-none rounded-lg text-white">
                Create an {currentView}
              </button>
            </div>
            <div className="w-full">
              { isLoading ? (
                <div className="flex mt-4 text-center flex-col items-center">
                  <p>Fetching Activities...</p>
                </div>
              ):(
                <div>
                  {
                    activities.map(activity => (
                      <Activies 
                        key={activity.id}
                        content={activity?.content}
                        projectId={activity?.projectId}
                        project={activity?.project}
                      />
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        )}
        {currentView === "Assignments" && (
          <div className="flex min-h-[400px] w-full flex-col">
            <button
              onClick={() => setShowAssignmentModal(!showAssignmentModal)}
              className="bg-gray-800 p-3 text-white rounded-lg w-[200px] float-right"
            >
              Create an {currentView}
            </button>
            {isLoading ? (
              <div className="flex mt-4 text-center flex-col items-center">
                <p>Fetching assignment...</p>
              </div>
            ) : assignments.length > 0 ? (
              <div className="w-full flex flex-wrap gap-4">
                {assignments.map((assign) => (
                  <div
                    key={assign?.id}
                    className="p-6 mt-5 border w-full sm:w-[48%] h-[600px] overflow-y-auto border-gray-300 rounded-lg bg-white shadow-sm"
                  >
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                      {assign?.title}
                    </h3>

                    <div className="text-base text-gray-700 mb-6">
                      <p className="font-medium">
                        Grade Level:
                        <span className="font-normal text-gray-600">
                          {" "}
                          {assign?.gradeLevel}
                        </span>
                      </p>
                    </div>

                    <div className="text-base text-gray-700 mb-6">
                      <p className="font-medium">Subject:</p>
                      <p className="text-gray-600">{assign?.subject}</p>
                    </div>

                    <div className="text-base text-gray-700 mb-6">
                      <p className="font-medium">Description:</p>
                      <p className="text-gray-600">{assign?.description}</p>
                    </div>

                    <div className="text-base text-gray-700 mb-6">
                      <p className="font-medium">Instructions:</p>
                      <p className="text-gray-600">{assign?.instructions}</p>
                    </div>

                    <div className="text-base text-gray-700 mb-6">
                      <p className="font-medium">Resources:</p>
                      <p className="text-gray-600">{assign?.resources}</p>
                    </div>

                    <div className="text-base text-gray-700 mb-6">
                      <p className="font-medium">Due Date:</p>
                      <p className="text-gray-600">
                        {new Date(assign?.dueDate).toLocaleDateString()}
                      </p>
                    </div>

                    <p className="text-sm text-gray-400 mt-4">
                      Created on: {new Date(assign?.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex mt-4 text-center flex-col items-center">
                <p>No Assignment available</p>
              </div>
            )}
          </div>
        )}
        {currentView === "Project" && (
          <div className="w-full flex flex-col">
            <button
              onClick={handleShowProjectModal}
              className="bg-gray-800 p-3 mb-5 text-white rounded-lg w-[200px] float-right"
            >
              Create Project
            </button>
            {isLoading ? (
              <div className="flex mt-4 text-center flex-col items-center">
                <p>Fetching project...</p>
              </div>
            ) : projects.length > 0 ? (
              <div className="auto-fit-card gap-5 mb-[6rem]">
                {projects.map((project) => (
                  <Resources
                    id={project?.id as string}
                    key={project?.id}
                    content={project.content}
                    desc={project?.description}
                    title={project?.title}
                    tags={project?.tags}        
                    contributors={project.contributors ? project.contributors.length : 0}
                    raters={project.ratings ? project.ratings.length : 0}
                    gradeLevel={project?.gradeLevel}
                  />
                ))}
              </div>
            ) : (
              <div className="flex mt-4 text-center flex-col items-center">
                <p>No Project available</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <CreateForm
          showModal={showFormModal}
          handleTrigger={() => handleShowFormModal()}
        />
      </div>
      <div>
        <AssignmentModal
          showModal={showAssignmentModal}
          handleTrigger={() => handleShowAssignmentModal()}
        />
      </div>
      <div>
        <ProjectModal
          isOpen={showProjectModal}
          onClose={() => handleShowProjectModal()}
        />
      </div>
    </div>
  );
};

export default Tab;
