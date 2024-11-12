import React, { useState } from "react";
import defaultUser from "../../assets/default-user.jpg";
import { useAuthContext } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import { toDataURL } from "../../utils/file";

function Profile() {
  const { authUser } = useAuthContext();
  const [formState, setFormState] = useState({
    name: authUser.name,
    dob: authUser.dob,
    avatar: authUser.avatar,
  });
  const [formPassword, setFormPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  console.log(formState);

  const { loading, update, changePassword } = useProfile();

  const handleSubmit = (e) => {
    e.preventDefault();
    update(formState);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    changePassword(formPassword);
  };

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    const dataUrl = await toDataURL(file);
    console.log(dataUrl);
    setFormState({ ...formState, avatar: dataUrl });
  };

  return (
    <div className="rounded-2xl bg-white h-full flex justify-center items-center">
      <div className="w-[500px]">
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label htmlFor="avatar">
              <img
                src={formState.avatar || defaultUser}
                alt=""
                className="size-24 rounded-full m-auto border-2 border-gray-950 border-solid cursor-pointer object-cover"
              />
            </label>
            <input
              className="invisible"
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleChangeAvatar}
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="name">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={authUser.email}
              disabled
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              // value={""}
              disabled
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formState.name ? formState.name : ""}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="dob">
              Day of birth
            </label>
            <input
              id="dob"
              type="date"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formState.dob ? formState.dob : ""}
              onChange={(e) =>
                setFormState({ ...formState, dob: e.target.value })
              }
            />
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-1.5 rounded-md"
            disabled={loading}
          >
            Update
          </button>
        </form>
        {/* Form change password */}
        <form onSubmit={handleSubmitPassword}>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="old-password">
              Old password
            </label>
            <input
              id="old-password"
              type="password"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formPassword.old_password}
              onChange={(e) =>
                setFormPassword({
                  ...formPassword,
                  old_password: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="new-password">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formPassword.new_password}
              onChange={(e) =>
                setFormPassword({
                  ...formPassword,
                  new_password: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-2">
            <label className="w-32 inline-block" htmlFor="confirm-password">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="p-1 border-gray-500 border-2 border-solid rounded-md"
              value={formPassword.confirm_password}
              onChange={(e) =>
                setFormPassword({
                  ...formPassword,
                  confirm_password: e.target.value,
                })
              }
            />
          </div>

          <button
            className="mt-4 w-full bg-blue-600 text-white py-1.5 rounded-md"
            disabled={loading}
          >
            Change password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
