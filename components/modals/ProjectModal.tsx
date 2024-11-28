import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/useUserStore";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  title: string;
  description: string;
  dueDate: string;
  content: string;
  tags: string;
  gradeLevel: string;
  objective: string;
  curriculum: string;
  document: File | null;
}

const ProjectModal: React.FC<FormProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { id: userId } = useUserStore((state) => state);

  const uploadFileToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blueportal");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyz1ogpac/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload document to Cloudinary");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("Failed to upload document. Please try again.");
      return null;
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
      content: "",
      tags: "",
      gradeLevel: "",
      objective: "",
      curriculum: "",
      document: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().max(300, "Description too long"),
      dueDate: Yup.date().required("Due date is required"),
      content: Yup.string().required("Content is required"),
      tags: Yup.string().required("Tags are required"),
      gradeLevel: Yup.string().required("Grade level is required"),
      objective: Yup.string()
        .max(500, "Objective too long")
        .required("Objective is required"),
      curriculum: Yup.string().required("Curriculum is required"),
      document: Yup.mixed()
        .required("Document is required")
        .test(
          "fileType",
          "Only PDF or DOCX files are allowed",
          (value) => {
            return (
              value instanceof File &&
              ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type)
            );
          }
        )
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const fileUrl = await uploadFileToCloudinary(values.document!);
        if (!fileUrl) return;

        const formData = {
          ...values,
          userId,
          fileUrl,
        };

        const response = await fetch("/api/project/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const { error } = await response.json();
          toast.error(error || "Failed to create project.");
        } else {
          toast.success("Project created successfully!");
          window.location.reload();
          onClose();
        }
      } catch (error) {
        console.error("Create Project Error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-auto justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md h-[500px] overflow-auto no-scrollbar">
        <h2 className="text-2xl font-semibold mb-6 mt-5">Create New Project</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...formik.getFieldProps("title")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...formik.getFieldProps("description")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              {...formik.getFieldProps("dueDate")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <p className="text-red-500 text-sm">{formik.errors.dueDate}</p>
            )}
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              {...formik.getFieldProps("content")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.content && formik.errors.content && (
              <p className="text-red-500 text-sm">{formik.errors.content}</p>
            )}
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              {...formik.getFieldProps("tags")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.tags && formik.errors.tags && (
              <p className="text-red-500 text-sm">{formik.errors.tags}</p>
            )}
          </div>
          <div>
            <label htmlFor="document" className="block text-sm font-medium">
              Upload Document (PDF or DOCX)
            </label>
            <input
              type="file"
              id="document"
              accept=".pdf, .docx"
              onChange={(event) =>
                formik.setFieldValue("document", event.currentTarget.files?.[0])
              }
              className="w-full p-2 border rounded cursor-pointer"
            />
            {formik.touched.document && formik.errors.document && (
              <p className="text-red-500 text-sm">{formik.errors.document}</p>
            )}
          </div>
          <div>
            <label htmlFor="gradeLevel" className="block text-sm font-medium">
              Grade Level
            </label>
            <input
              type="text"
              id="gradeLevel"
              {...formik.getFieldProps("gradeLevel")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.gradeLevel && formik.errors.gradeLevel && (
              <p className="text-red-500 text-sm">{formik.errors.gradeLevel}</p>
            )}
          </div>

          {/* Objective */}
          <div>
            <label htmlFor="objective" className="block text-sm font-medium">
              Objective
            </label>
            <textarea
              id="objective"
              {...formik.getFieldProps("objective")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.objective && formik.errors.objective && (
              <p className="text-red-500 text-sm">{formik.errors.objective}</p>
            )}
          </div>

          {/* Curriculum */}
          <div>
            <label htmlFor="curriculum" className="block text-sm font-medium">
              Curriculum
            </label>
            <textarea
              id="curriculum"
              {...formik.getFieldProps("curriculum")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.curriculum && formik.errors.curriculum && (
              <p className="text-red-500 text-sm">{formik.errors.curriculum}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
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

