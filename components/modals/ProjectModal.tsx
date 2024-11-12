import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/useUserStore';

interface FormProps {
    isOpen: boolean;
    onClose: () => void; 
} 
  

const ProjectModal = ({ isOpen, onClose }:FormProps) => {
  const [loading, setLoading] = useState(false);

  const { id: userId } = useUserStore(state => state); 

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: '',
      content: '',
      tags: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().max(300, 'Description too long'),
      dueDate: Yup.date().required('Due date is required'),
      content: Yup.string().required('Content is required'),
      tags: Yup.string().required('Tags are required'),
    }),
    onSubmit: async (values) => {
      const payload = { 
        ...values, 
        userId, 
        tags: values.tags.split(',').map(tag => tag.trim())
      } 
      setLoading(true);
      try {
        const res = await fetch('/api/project/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    
        if (!res.ok) {
            const { error } = await res.json();
            toast.error(error || 'Failed to submit the project.');
        } else {
            toast.success('Project created successfully!');
            onClose(); 
        }
      }catch(err){
        console.error("Create Project Error:", err);
        toast.error('An unexpected error occurred. Please try again.');
      }finally{
        setLoading(false)
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-auto justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 mt-5">Create New Project</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              type="text"
              id="title"
              {...formik.getFieldProps('title')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.title && formik.errors.title ? <p className="text-red-500 text-sm">{formik.errors.title}</p> : null}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea
              id="description"
              {...formik.getFieldProps('description')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.description && formik.errors.description ? <p className="text-red-500 text-sm">{formik.errors.description}</p> : null}
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              id="dueDate"
              {...formik.getFieldProps('dueDate')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.dueDate && formik.errors.dueDate ? <p className="text-red-500 text-sm">{formik.errors.dueDate}</p> : null}
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">Content</label>
            <textarea
              id="content"
              {...formik.getFieldProps('content')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.content && formik.errors.content ? <p className="text-red-500 text-sm">{formik.errors.content}</p> : null}
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              {...formik.getFieldProps('tags')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.tags && formik.errors.tags ? <p className="text-red-500 text-sm">{formik.errors.tags}</p> : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
          <button
            type="button"
            className="w-full mt-3 bg-gray-300 text-gray-800 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
