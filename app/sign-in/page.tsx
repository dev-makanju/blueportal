'use client';
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import { useUserStore } from "@/store/useUserStore";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const loginUser = useUserStore(state => state.loginUser);
  const loading = useUserStore(state => state.signingIn)

  const validateForm = (): boolean => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    try {
      const response = await loginUser({ email, password });
    
      if (response?.error) {
        toast.error(response.error || 'Login failed. Please check your credentials and try again.');
      } else {
        router.push("/");
      } 
    }catch (err) {
      console.error("Login error:", err);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 m-3">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?
            <a href="/sign-up" className="text-gray-800 font-semibold">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
