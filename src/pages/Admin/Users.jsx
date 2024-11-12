import { useEffect, useState } from "react";

import useShow from "../../hooks/useShow";
import Modal from "../../components/Modal/Modal";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import useUser from "../../hooks/useUser";

const roles = ["moderate", "normal"];

function Users() {
  const [showAdd, toggleShowAdd] = useShow();
  const [showEdit, toggleShowEdit] = useShow();
  const [showDelete, toggleShowDelete] = useShow();
  const [formAdd, setFormAdd] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const { loading, getUsers, createUser, updateRole, deleteUser } = useUser();

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  //   Add function
  const handleSubmitAddForm = async (e) => {
    e.preventDefault();
    const dataUser = await createUser(formAdd);
    handleResetAddForm();
    setUsers([...users, dataUser]);
  };
  const handleResetAddForm = () => {
    toggleShowAdd();
    setFormAdd({
      username: "",
      email: "",
      password: "",
    });
  };

  //   Edit function
  const handleEdit = (user) => {
    setSelectedUser(user);
    toggleShowEdit();
  };
  const handleSubmitUpdateForm = (e) => {
    e.preventDefault();
    if (updateRole(selectedUser)) {
      toggleShowEdit();
      //   Update users directly after update role
      const newUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...selectedUser } : user
      );
      setUsers(newUsers);
    }
  };

  //   Delete function
  const handleConfirmDelete = (user) => {
    setSelectedUser(user);
    toggleShowDelete();
  };

  const handleDelete = async () => {
    if (await deleteUser(selectedUser)) {
      toggleShowDelete();
      //   Delete user directly after delete
      const newUsers = users.filter((item) => item.id !== selectedUser.id);
      setUsers(newUsers);
    }
  };

  return (
    <div className="">
      <div className="text-end">
        <button
          className="px-3 py-2 text-white bg-blue-500 rounded"
          onClick={toggleShowAdd}
        >
          Add user
        </button>
      </div>
      <table className="w-full">
        <thead className=" text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2">
              username
            </th>
            <th scope="col" className="px-4 py-2">
              email
            </th>
            <th scope="col" className="px-4 py-2">
              role
            </th>
            <th scope="col" className="px-4 py-2">
              verified
            </th>
            <th scope="col" colSpan={2} className="px-4 py-2">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b text-center">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.is_verified ? "yes" : "no"}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleConfirmDelete(user)}
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
        <div className="text-2xl">Add user</div>
        <form onSubmit={handleSubmitAddForm}>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="username">
              username
            </label>
            <input
              id="username"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formAdd.username}
              onChange={(e) =>
                setFormAdd({ ...formAdd, username: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="email">
              email
            </label>
            <input
              id="email"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formAdd.email}
              onChange={(e) =>
                setFormAdd({ ...formAdd, email: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="password">
              password
            </label>
            <input
              id="password"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formAdd.password}
              onChange={(e) =>
                setFormAdd({ ...formAdd, password: e.target.value })
              }
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
      </Modal>

      {/* Modal edit user */}
      <Modal open={showEdit} onClose={toggleShowEdit}>
        <div className="text-2xl">Edit User</div>
        <form onSubmit={handleSubmitUpdateForm} className="w-[400px]">
          <div className="flex mt-2">
            <label className="w-32 inline-block" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
              value={selectedUser?.username}
              disabled
            />
          </div>
          <div className="flex mt-2">
            <label className="w-32 inline-block" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
              value={selectedUser?.email}
              disabled
            />
          </div>
          <div className="flex mt-3">
            <span className="w-32">Role</span>
            <RadioGroup
              value={selectedUser?.role}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e })}
              className="flex gap-4 "
            >
              {roles.map((role) => (
                <Field key={role} className="flex items-center gap-2">
                  <Radio
                    value={role}
                    className="group flex size-5 items-center justify-center rounded-full border-2 border-gray-700 bg-white data-[checked]:bg-blue-400"
                  >
                    <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                  </Radio>
                  <Label className="uppercase">{role}</Label>
                </Field>
              ))}
            </RadioGroup>
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
          Do you really want delete user
          <span className="font-medium text-red-500">
            {" "}
            {selectedUser?.email}
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

export default Users;
