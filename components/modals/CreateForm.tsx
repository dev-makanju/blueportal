'use client'
import React,{ useState, useEffect } from "react";
import { toast } from "react-toastify";
import { LessonPlanProps } from "@/types/main";
import { useUserStore } from "@/store/useUserStore";

interface FormProps {
  showModal: boolean;
  handleTrigger: () => void; 
} 

const CreatForm: React.FC<FormProps> = ({ showModal, handleTrigger }) => {
    const [loading, setLoading] = useState(false);
    const currentTime = new Date()
    const { id } = useUserStore(state => state); 

    const [formData, setFormData] = useState<LessonPlanProps>({
        title: '',
        gradeLevel: '',
        objectives: '',
        materials: '',
        lessonPhases: '',
        date: currentTime,
        assessment: '',
        reflection: '',
        userId: '',
    });

    useEffect(() => {
        if (id) {   
            setFormData((prev)=> ({
                ...prev,
                userId: id
            }))
        }
    },[id])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await fetch('/api/plans/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          if (!res.ok) {
            const { error } = await res.json();
            toast.error(error || 'Failed to submit the lesson plan.');
          } else {
            toast.success('Lesson plan submitted successfully!');
            window.location.reload();
            handleTrigger(); 
          }
        } catch (err) {
          console.error("Login error:", err);
          toast.error('An unexpected error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
    };
    
    return (
        <>
        {showModal && (
            <div
            id="popup-modal"
            className="bg-[#00000054] overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full md:inset-0"
            >
            <div className="relative p-4 w-full max-w-md max-h-full h-[500px] overflow-auto no-scrollbar">
                <div className="relative rounded-lg shadow bg-gray-100">
                <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleTrigger}
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
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5">
                    <form onSubmit={handleSubmit} className="p-6 rounded-lg max-w-3xl mx-auto mt-10">
                        <h2 className="text-2xl font-bold mb-6">Lesson Plan Form</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Lesson Title</label>
                            <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                            placeholder="Enter lesson title"
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Grade Level</label>
                            <input
                                type="text"
                                name="gradeLevel"
                                value={formData.gradeLevel}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Enter grade level"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Lesson Objectives</label>
                            <textarea
                                name="objectives"
                                value={formData.objectives}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Enter lesson objectives"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Materials Needed</label>
                            <textarea
                                name="materials"
                                value={formData.materials}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="List materials needed for the lesson"
                                required
                            />
                        </div>

                        {/* <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Introduction</label>
                            <textarea
                                name="intro"
                                value={formData.intro}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Enter a brief introduction for the lesson"
                                required
                            />
                        </div> */}

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Main Activity</label>
                            <textarea
                                name="lessonPhases"
                                value={formData.lessonPhases}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Describe the main activity for the lesson"
                                required
                            />
                        </div>
{/* 
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Practice</label>
                            <textarea
                                name="practice"
                                value={formData.practice}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Describe the practice/exercise for the lesson"
                                required
                            />
                        </div> */}

                        {/* <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Conclusion</label>
                            <textarea
                                name="conclusion"
                                value={formData.conclusion}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Summarize the lesson"
                                required
                            />
                        </div> */}

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Assessment</label>
                            <textarea
                            name="assessment"
                            value={formData.assessment}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                            placeholder="Describe assessment methods for the lesson"
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Reflection</label>
                            <textarea
                            name="reflection"
                            value={formData.reflection}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
                            placeholder="Notes for lesson reflection"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#00000054] hover:bg-[#00000054] text-white font-bold py-2 rounded-lg mt-4"
                            disabled={loading || !id}
                        >
                            {loading ? 'Submitting...' : 'Submit Lesson Plan'}
                        </button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
    );
};

export default CreatForm;
