'use client'
import React, {useState} from 'react'

interface FormProps {
   showModal: boolean;
   handleTrigger: () => void; 
}

const AssignmentModal: React.FC<FormProps> = ({ showModal, handleTrigger }) => {
  
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        dueDate: '',
        gradeLevel: '',
        instructions: '',
        resources: '',
    });
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Assignment:', formData);
        alert('Assignment submitted!');
    };

    return (
        <>
            {showModal && (
                <div
                id="popup-modal"
                className="bg-[#00000054] overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full md:inset-0"
                >
                <div className="relative p-4 w-full max-w-md max-h-full">
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
                        {/* form */}
                        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg max-w-3xl mx-auto mt-10">
                            <h2 className="text-2xl font-bold mb-6 text-center">Create an Assignment</h2>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Assignment Title</label>
                                <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter assignment title"
                                required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Description</label>
                                <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Brief description of the assignment"
                                required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Subject</label>
                                <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter subject (e.g., Math, Science)"
                                required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Due Date</label>
                                <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
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
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter grade level"
                                required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Instructions</label>
                                <textarea
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Detailed instructions for the assignment"
                                required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Resources</label>
                                <input
                                type="text"
                                name="resources"
                                value={formData.resources}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Any resources or links for the assignment"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#00000054] hover:bg-[#00000054] text-white font-bold py-2 rounded-lg mt-4"
                            >
                                Submit Assignment
                            </button>
                            </form>
                    </div>
                    </div>
                </div>
                </div>
            )}
            </>
    )
}

export default AssignmentModal