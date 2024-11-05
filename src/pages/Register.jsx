import { useState } from "react";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";

function Register() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, register } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="bg-white p-8 rounded-xl w-[400px]">
        <div className="text-4xl uppercase text-center font-semibold">
          register
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="border-2 border-gray-500 rounded-md p-1 w-full"
              value={formState.username}
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
          </div>
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
          <div className="mt-4">
            <label
              htmlFor="confirm-password"
              className="block font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="border-2 border-gray-500 rounded-md p-1 w-full"
              value={formState.confirmPassword}
              onChange={(e) =>
                setFormState({ ...formState, confirmPassword: e.target.value })
              }
            />
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-1.5 rounded-md"
            disabled={loading}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
