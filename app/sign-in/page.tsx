export default async function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 m-3">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
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
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 "
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-800 text-white rounded-lg font-medium"
          >
            Login
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
