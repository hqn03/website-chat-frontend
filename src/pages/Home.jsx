import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { AddIcon, ChatIcon, LogoutIcon, ProfileIcon } from "../components/Icon";
import defaultAvatar from "../assets/default-user.jpg";
import useAuth from "../hooks/useAuth";
import Modal from "../components/Modal/Modal";
import Profile from "./Home/Profile";
import useShow from "../hooks/useShow";
import FormAddRoom from "./Home/FormAddRoom";
import { useEffect } from "react";
import { apiGetRoomsUser } from "../api";

function Home() {
  const { authUser } = useAuthContext();
  const [showProfile, toggleShowProfile] = useShow();
  const [showRoom, toggleShowRoom] = useShow();
  const { logout } = useAuth();

  useEffect(() => {
    apiGetRoomsUser().then((data) => console.log(data));
  }, []);
  return (
    <div className="h-screen bg-gray-950 flex">
      {/* sidebar */}
      <div className="w-20 text-gray-500 flex flex-col justify-between p-2 ">
        <img
          className="size-14 mx-auto rounded-full"
          src={authUser.avatar ? authUser.avatar : defaultAvatar}
          alt=""
        />
        <div className="text-center">
          <NavLink
            to={"/chat"}
            className="my-1 block hover:text-white hover:bg-gray-700 rounded p-1 cursor-pointer"
          >
            <ChatIcon className="size-8 mx-auto" />
            <span className="text-sm">All chat</span>
          </NavLink>
          {authUser.role === "moderate" && (
            <div
              className="my-1 block hover:text-white hover:bg-gray-700 rounded p-1 cursor-pointer"
              onClick={toggleShowRoom}
            >
              <AddIcon className="size-8 m-auto" />
              <span className="text-sm">Create room</span>
            </div>
          )}
          <div
            className="my-1 block hover:text-white hover:bg-gray-700 rounded p-1 cursor-pointer"
            onClick={toggleShowProfile}
          >
            <ProfileIcon className="size-8 m-auto" />
            <span className="text-sm">Profile</span>
          </div>
        </div>
        <div
          className="w-full text-center hover:text-white hover:bg-gray-700 rounded p-1 cursor-pointer"
          onClick={logout}
        >
          <LogoutIcon className="size-8 m-auto" />
          <span className="text-sm">Log out</span>
        </div>
      </div>
      <div className="flex-1 p-2">
        <Outlet />
      </div>
      <Modal open={showProfile} onClose={toggleShowProfile}>
        <Profile />
      </Modal>

      <Modal open={showRoom} onClose={toggleShowRoom}>
        <FormAddRoom toggleShow={toggleShowRoom} />
      </Modal>
    </div>
  );
}

export default Home;
