import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="bg-white p-8 rounded-xl w-[400px]">
        <div className="text-4xl uppercase text-center font-semibold">
          login
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="email" className="block font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-2 border-gray-500 rounded-md p-1 w-full"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border-2 border-gray-500 rounded-md p-1 w-full"
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <Link to="/register" className="hover:text-blue-400">
              Don't have account
            </Link>
            <Link to="/forgot" className="hover:text-blue-400">
              Forgot password
            </Link>
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-1.5 rounded-md"
            disabled={loading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
