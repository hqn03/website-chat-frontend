import { useEffect, useState } from "react";

import useShow from "../../hooks/useShow";
import Modal from "../../components/Modal/Modal";
import useRoom from "../../hooks/useRoom";

function Groups() {
  const [showAdd, toggleShowAdd] = useShow();
  const [showEdit, toggleShowEdit] = useShow();
  const [showDelete, toggleShowDelete] = useShow();
  const [rooms, setRooms] = useState([]);
  const { loading, getRooms, createRoom, updateRoom, deleteRoom } = useRoom();

  //   form value
  const [name, setName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    getRooms().then((data) => setRooms(data));
  }, []);

  const handleSubmitAddForm = async (e) => {
    e.preventDefault();
    const result = await createRoom(name);
    handleResetAddForm();
    setRooms([...rooms, result]);
  };
  const handleResetAddForm = () => {
    toggleShowAdd();
    setName("");
  };

  //   Edit function
  const handleEdit = (room) => {
    setSelectedRoom(room);
    toggleShowEdit();
  };
  const handleSubmitUpdateForm = async (e) => {
    e.preventDefault();
    if (updateRoom(selectedRoom)) {
      toggleShowEdit();
      //   Update rooms directly after update role
      const newRooms = rooms.map((room) =>
        room.id === selectedRoom.id ? { ...room, ...selectedRoom } : room
      );
      setRooms(newRooms);
    }
  };

  //   Delete function
  const handleConfirmDelete = (room) => {
    setSelectedRoom(room);
    toggleShowDelete();
  };

  const handleDelete = () => {
    if (deleteRoom(selectedRoom)) {
      toggleShowDelete();
      //   Delete user directly after delete
      const newRooms = rooms.filter((room) => room.id !== selectedRoom.id);
      setRooms(newRooms);
    }
  };

  return (
    <div className="">
      <div className="text-end">
        <button
          className="px-3 py-2 text-white bg-blue-500 rounded"
          onClick={toggleShowAdd}
        >
          Add room
        </button>
      </div>
      <table className="w-full">
        <thead className=" text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2">
              name
            </th>
            <th scope="col" className="px-4 py-2">
              created by
            </th>
            <th scope="col" className="px-4 py-2">
              create at
            </th>

            <th scope="col" colSpan={2} className="px-4 py-2">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="bg-white border-b text-center">
              <td className="px-4 py-2">{room.name}</td>
              <td className="px-4 py-2">{room.created_by}</td>
              <td className="px-4 py-2">{room.created_at}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(room)}
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleConfirmDelete(room)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal add user */}
      <Modal open={showAdd} onClose={handleResetAddForm}>
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
            >
              Add
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal edit user */}
      <Modal open={showEdit} onClose={toggleShowEdit}>
        <div className="text-2xl">Edit User</div>
        <form onSubmit={handleSubmitUpdateForm} className="w-[400px]">
          <div className="flex mt-2">
            <label className="w-32 inline-block" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
              value={selectedRoom?.name}
              onChange={(e) =>
                setSelectedRoom({ ...selectedRoom, name: e.target.value })
              }
            />
          </div>

          <div className="text-end mt-4 text-white ">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 rounded"
              onClick={toggleShowEdit}
            >
              Close
            </button>
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal delete user */}
      <Modal open={showDelete} onClose={toggleShowDelete}>
        <div className="text-2xl">Delete user</div>
        <div className="mt-4">
          Do you really want delete room
          <span className="font-medium text-red-500">
            {" "}
            {selectedRoom?.name}
          </span>
        </div>
        <div className="text-end text-white mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 rounded-md"
            onClick={toggleShowDelete}
          >
            Close
          </button>
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-red-500 rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Groups;
