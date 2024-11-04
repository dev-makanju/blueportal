'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export type Role = "STUDENT" | "LECTURER";

interface SignUpProps {
  name: string;
  email: string;
  pass: string;
  role: Role;
}

const Page = () => {
  const [formData, setFormData] = useState<SignUpProps>({
    name: "",
    email: "",
    pass: "",
    role: "STUDENT",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.pass ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json()
      if (!res.ok) {
        throw new Error(`${ data?.message ||  'Something went wrong, please try again.'}`);
      }
      router.push("/sign-in");
      toast.success('User registered successfully');    
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 m-3">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className='bg-red-300 p-4 w-full'>
               <p className="text-red-500 text-sm">{error}</p>
            </div>    
        )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="pass"
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            >
              <option value="">Select role</option>
              <option value="STUDENT">Student</option>
              <option value="LECTURER">Lecturer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <span className="loader border-t-2 border-white rounded-full w-4 h-4 mr-2"></span>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?
            <a href="/sign-in" className="text-gray-800 font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;