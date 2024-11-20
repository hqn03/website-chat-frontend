import { useState } from "react";
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
    <div className="w-[500px]">
      <form onSubmit={handleSubmit}>
        <div className="mt-2 flex justify-center">
          <label htmlFor="avatar" className="inline-block">
            <img
              src={formState.avatar || defaultUser}
              alt=""
              className="size-24 rounded-full m-auto border-2 border-gray-950 border-solid cursor-pointer object-cover"
            />
          </label>
          <input
            className="hidden"
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleChangeAvatar}
          />
        </div>
        <div className="mt-2 text-center font-medium">
          <p>{authUser?.username}</p>
          <p>{authUser?.email}</p>
        </div>

        <div className="mt-2 flex gap-4">
          <label className="w-32 inline-block font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
            id="name"
            type="text"
            value={formState.name ? formState.name : ""}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
          />
        </div>
        <div className="mt-2 flex gap-4">
          <label className="w-32 inline-block font-medium" htmlFor="dob">
            Day of birth
          </label>
          <input
            className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
            id="dob"
            type="date"
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
        <div className="mt-2 flex gap-4">
          <label
            className="w-32 inline-block font-medium"
            htmlFor="old-password"
          >
            Old password
          </label>
          <input
            className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
            id="old-password"
            type="password"
            value={formPassword.old_password}
            onChange={(e) =>
              setFormPassword({
                ...formPassword,
                old_password: e.target.value,
              })
            }
          />
        </div>
        <div className="mt-2 flex gap-4">
          <label
            className="w-32 inline-block font-medium"
            htmlFor="new-password"
          >
            New password
          </label>
          <input
            className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
            id="new-password"
            type="password"
            value={formPassword.new_password}
            onChange={(e) =>
              setFormPassword({
                ...formPassword,
                new_password: e.target.value,
              })
            }
          />
        </div>
        <div className="mt-2 flex gap-4">
          <label
            className="inline-block font-medium"
            htmlFor="confirm-password"
          >
            Confirm password
          </label>
          <input
            className="p-1 border-gray-500 border-2 border-solid rounded-md flex-1"
            id="confirm-password"
            type="password"
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
  );
}

export default Profile;
