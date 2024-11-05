import { useState } from "react";
import { Link } from "react-router-dom";
import useForgot from "../hooks/useReset";

function Forgot() {
  const [formState, setFormState] = useState({ email: "" });
  const { loading, sendEmail } = useForgot();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(formState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="bg-white p-8 rounded-xl w-[450px]">
        <div className="text-4xl uppercase text-center font-semibold">
          forgot password
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
          <Link to="/login" className="hover:text-blue-400">
            Back to login
          </Link>

          <button
            className="mt-4 w-full bg-blue-600 text-white py-1.5 rounded-md"
            disabled={loading}
          >
            Send email
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
