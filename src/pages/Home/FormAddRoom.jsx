import React, { useState } from "react";
import useRoom from "../../hooks/useRoom";

function FormAddRoom({ toggleShow }) {
  const [name, setName] = useState("");
  const { loading, createRoom } = useRoom();

  const handleSubmitAddForm = async (e) => {
    e.preventDefault();
    const result = await createRoom(name);
    handleResetAddForm();
  };
  const handleResetAddForm = () => {
    toggleShow();
    setName("");
  };
  return (
    <>
      <div className="text-2xl">Add room</div>
      <form onSubmit={handleSubmitAddForm}>
        <div className="mt-2">
          <label className="w-32 inline-block" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="p-1 border-gray-500 border-2 border-solid rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="text-end mt-2 text-white">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 rounded"
            onClick={handleResetAddForm}
          >
            Close
          </button>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-green-500 rounded"
            disabled={loading}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}

export default FormAddRoom;