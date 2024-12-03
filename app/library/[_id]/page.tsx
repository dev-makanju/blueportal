'use client';
import { jsPDF } from "jspdf";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { SingleProjectProps, Contributor } from '@/types/main';
import Comment from '@/components/comment/Comment';
import Review from '@/components/review/Review';
import OriginalProject from '@/components/modals/OriginalProject';
import { stringToSlug } from "@/utils/utililty";

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
    const [approving, setApproving] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showOriginal, setShowOriginal] = useState<boolean>(false);

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

    const approveRequest = async (value: string, collaboratorId: string) => {
      setApproving(true)
      try {
        const response = await fetch("/api/project/approve-req", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: collaboratorId, projectId: params._id, statusType: value }),
        });
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error || "Failed to approve request");
          setApproving(false);
          return;
        }
        setIsEditingApproved(true);
        setApproving(false);
        toast.success("Request approve successfully");
      } catch(error) {
        setApproving(false);
        console.error("Failed to approve request:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  
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

    const handleSubmitWork = async () => {
      setSubmitting(true);
      try {
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const response = await fetch("/api/project/update-docs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id, projectId: params._id, content }),
        });

        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error || "Failed to submit work");
          setSubmitting(false);
          return;
        }
        toast.success("Work submitted successfully");
        setSubmitting(false);
      } catch (error) {
        console.error("Failed to submit work:", error);
        toast.error("An error occurred. Please try again.");
        setSubmitting(false);
      }
    };

    const showOriginalCopy = () => {
      setShowOriginal(!showOriginal);
    }

    const updateDownloadCount = async () => {
      try{
          const response = await fetch('/api/download/click', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify({
              projectId: id,
              userId: project?.id
            })
          })

          if(response) return;
      }catch(err){
          console.error(err);
      }
    }
  
    const downLoadResourseAsPDF = (title: string, document: string) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",            
            format: "A4" 
        });
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40; 
        const textWidth = pageWidth - margin * 2;
        const startX = margin;
        const startY = margin;
        const lineHeight = 20; 
    
        const lines = doc.splitTextToSize(document, textWidth);
        let cursorY = startY;
    
        lines.forEach((line: string) => {
            if (cursorY + lineHeight > pageHeight - margin) {
                doc.addPage(); 
                cursorY = startY; 
            }
            doc.text(line, startX, cursorY);
            cursorY += lineHeight; 
        });
    
        doc.save(`${stringToSlug(title)}.pdf`);
        updateDownloadCount()
    }; 
  
    useEffect(() => {
      fetchProjectByID();
    },[]);
  
    const renderedContent =
      role === 'LECTURER' && (isEditingApproved || isOwner)
        ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
        : project?.content || "No content available";
  
    return (
      <div className="lg:flex lg:justify-center lg:gap-6 mt-5">
        <OriginalProject 
          id={project?.id as string}
          userId={id} 
          handleTrigger={showOriginalCopy} 
          showModal={showOriginal} 
          title={project?.title as string} 
          projectContent={project?.original as string} 
        />
        { loading ? (
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
              { project?.original?.length !== project?.content?.length && (  
                <button
                    className="bg-gray-800 outline-none rounded-lg p-1 text-white"
                    onClick={() => showOriginalCopy() }
                  >
                    View original copy
                </button>
              )}
            </div>
            <div className="p-2 mt-3 min-h-[450px]">
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
            { (role === "LECTURER" && isEditingApproved || isOwner) && (
              <div className="flex border-b-2 p-3 justify-between flex-wrap">
                <button
                  onClick={handleSubmitWork} 
                  disabled={submitting} 
                  className="bg-gray-800 outline-none rounded-lg p-1 text-white"
                >
                  {submitting ? "Submitting..." : "Remix and Submit"}
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className='lg:w-1/4 flex flex-col gap-4'>
          { !loading ? ( 
            <>
              <div className="flex items-center gap-2 mt-4">
                {project?.fileUrl ? (
                  <a 
                    href={project.fileUrl} 
                    download="uploaded-resource.pdf"
                    className="text-blue-500 hover:underline"
                  >
                    Download additional resources
                  </a>
                ) : (
                  <span className="text-gray-500">No additional resources available</span>
                )}
              </div>
              <Comment 
                userId={id} 
                projectId={project?.id as string}
                showInputField={isEditingApproved || isOwner}
              />  
              <Review 
                userId={id} 
                projectId={project?.id as string}
              />
            </>
          ): null}
          <div className="border-2 p-4 mt-5 lg:mt-0 bg-gray-50">
            { project?.original?.length !== project?.content?.length && (
                <button  onClick={() => downLoadResourseAsPDF(project?.title as string, project?.content as string)} className=' mb-5 border-2 flex-1 bg-gray-800 outline-none rounded-lg p-1 text-white'>
                  Download Remixed Copy
                </button>
            )}
            <div className="mb-3">
              <p className="font-semibold">Contributors</p>
              {project?.contributors?.length ? (
                project.contributors.map((contributor: Contributor, index) => (
                  <div key={index} className="flex gap-4">
                    <p>{contributor.user.name}</p>
                    {isOwner && contributor.status === "PENDING" && (
                      <button
                        disabled={approving}
                        className="bg-gray-800 outline-none rounded-lg p-1 text-white"
                        onClick={() => approveRequest("APPROVED", contributor.userId )}
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
      </div>
    );
};
  
export default Page;
  