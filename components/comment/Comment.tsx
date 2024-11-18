import { UserTypes } from "@/types/main";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  user: UserTypes
}

interface userProps {
  projectId?: string;
  userId?: string;
}

const Comment = ({projectId , userId }: userProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comment?projectId=${projectId}`);
      const data = await response.json();

      if (response.ok) {
        setComments(data);
      } else {
        toast.error(data?.error || "Failed to fetch comments.");
      }
      setLoading(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
      setLoading(false);
    }
  };

  const addComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newComment.trim()) {
      setSending(true);
      try {
        const response = await fetch("/api/comment/add-comment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userId, projectId: projectId, content: newComment }),
        });

        const data = await response.json();
        if (response.ok) {
          setComments((prev) => [...prev, data]);
          setNewComment(""); 
        } else {
          toast.error(data?.error || "Failed to add comment.");
        }
        setSending(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
        setSending(false);
      }
    }
  };

  useEffect(() => {
    if (!projectId) return;
    fetchComments();
  }, [projectId]);

  return (
    <div className="border-2 p-1 mt-5 lg:mt-0 bg-gray-50">
      <h3 className="text-lg pl-3 pt-2 font-bold mb-4">Discussions</h3>
      <section className="rounded-lg h-[320px]">
        { !loading ? (  
          <div>
              { comments.length !== 0 ? (       
                <div className="flex-1 gap-3 overflow-y-auto h-[300px] max-h-[350px]">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`flex items-start gap-2.5 border-1 p-1 w-4/5 sm:w-[300px] ${
                        comment.userId === userId ? "float-right" : ""
                      }`}
                    >
                      <div className="p-1 font-bold bg-[#FFF] text-black text-sm rounded-full border-2">
                        {comment?.user?.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-[#000]">
                            {comment.user?.name}
                          </span>
                          <span className="text-sm font-normal text-gray-500">
                            {new Date(comment.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm font-normal py-2 text-[#000]">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ):(
                <div className="flex-1 gap-3 overflow-y-auto h-[300px] max-h-[350px]">
                  <p>No discussion history, start a conversation</p>
                </div>
              )}
          </div>
        ):(
          <div className='m-auto h-[300px] max-h-[350px]'>
            <p className="text-center text-black">Fetching Discussions...</p>
          </div>
        )}
        <div className="border-2 rounded-lg text-sm flex gap-1">
          <input
            type="text"
            placeholder="Type a message..."
            className="p-2 w-full rounded focus:outline-none text-black"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={addComment}
          />
          { sending && (
            <div className="border-2 text-white text-center w-[70px] h-[32px] bg-black">Sending...</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Comment;
