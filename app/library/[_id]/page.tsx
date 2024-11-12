'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { SingleProjectProps, Contributor } from '@/types/main';

type PageParams = {
  _id: string;
};

const Page: React.FC = () => {
    const { role, id } = useUserStore(state => state); 
    const params: PageParams = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
    const [isEditingApproved, setIsEditingApproved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [project, setProject] = useState<SingleProjectProps | null>(null);
  
    const isOwner = project?.userId === id;
  
    const onEditorStateChange = (newEditorState: EditorState) => {
      setEditorState(newEditorState);
    };
  
    const handleRequestEdit = async (value: string) => {
      try {
        const response = await fetch("/api/project/edit-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id, projectId: params._id, statusType: value }),
        });
  
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error || "Failed to send request");
          return;
        }
  
        toast.success("Edit request sent successfully");
        setIsRequestPending(true);
      } catch (error) {
        console.error("Failed to send edit request:", error);
        toast.error("An error occurred. Please try again.");
      }
    };
  
    const fetchProjectByID = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/project/single?_id=${params._id}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        setProject(data);
  
        if (data.content) {
          const blocksFromHtml = htmlToDraft(data.content);
          const contentState = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);
  
          const pending = data.contributors.find(
            (item: Contributor) => item.userId === id && item.projectId === params._id
          );
  
          if (pending?.status === 'PENDING') setIsRequestPending(true);
          if (pending?.status === 'APPROVED') setIsEditingApproved(true);
          
          setEditorState(EditorState.createWithContent(contentState));
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching project:", error);
        toast.error("Failed to fetch project. Please try again.");
      }
    };
  
    useEffect(() => {
      fetchProjectByID();
    }, []);
  
    const renderedContent =
      role === 'LECTURER' && (isEditingApproved || isOwner)
        ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
        : project?.content || "No content available";
  
    return (
      <div className="lg:flex lg:justify-center lg:gap-6 mt-5">
        {loading ? (
          <div className="border-2 lg:w-3/5 min-h-[400px]">
            <p className="text-center mb-6">Loading...</p>
          </div>
        ) : (
          <div className="lg:w-3/5 border-2 min-h-[400px]">
            <div className="flex border-b-2 p-3 justify-between flex-wrap">
              {role === 'LECTURER' && !isOwner && !isEditingApproved && (
                <button
                  className="bg-gray-800 outline-none rounded-lg p-1 text-white"
                  onClick={() => handleRequestEdit("PENDING")}
                  disabled={isRequestPending}
                >
                  {isRequestPending ? "Pending edit request" : "Ask to edit"}
                </button>
              )}
              <div className="flex items-center gap-2">
                <Image
                  className="rounded-full border-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="avatar"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="p-2 mt-3">
              {(role === "LECTURER" && (isEditingApproved || isOwner)) ? (
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEditorStateChange}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
              )}
            </div>
            {role === "LECTURER" && isEditingApproved && (
              <div className="flex border-b-2 p-3 justify-between flex-wrap">
                <button className="bg-gray-800 outline-none rounded-lg p-1 text-white">
                  Submit your work
                </button>
              </div>
            )}
          </div>
        )}
  
        <div className="lg:w-1/4 border-2 p-4 mt-5 lg:mt-0 bg-gray-50">
          <h3 className="text-lg font-bold mb-4">Project Details</h3>
          <div className="mb-3">
            <p className="font-semibold">Contributors:</p>
            {project?.contributors?.length ? (
              project.contributors.map((contributor: Contributor, index) => (
                <div key={index} className="flex gap-4">
                  <p>{contributor.user.name}</p>
                  {isOwner && contributor.status === "PENDING" && (
                    <button
                      className="bg-gray-800 outline-none rounded-lg p-1 text-white"
                      onClick={() => handleRequestEdit("APPROVED")}
                    >
                      Approve request
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No contributors</p>
            )}
          </div>
        </div>
      </div>
    );
};
  
export default Page;
  