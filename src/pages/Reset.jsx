import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useForgot from "../hooks/useReset";

function Reset() {
  const { uid, token } = useParams();
  const { loading, reset } = useForgot();
  const [formState, setFormState] = useState({
    uid: uid,
    token: token,
    new_password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    reset(formState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="bg-white p-8 rounded-xl w-[450px]">
        <div className="text-4xl uppercase text-center font-semibold">
          reset password
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="new-password"
              className="block font-medium text-gray-900"
            >
              New password
            </label>
            <input
              id="new-password"
              type="password"
              className="border-2 border-gray-500 rounded-md p-1 w-full"
              value={formState.new_password}
              onChange={(e) =>
                setFormState({ ...formState, new_password: e.target.value })
              }
            />
            <button
              className="mt-4 w-full bg-blue-600 text-white py-1.5 rounded-md"
              disabled={loading}
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reset;
