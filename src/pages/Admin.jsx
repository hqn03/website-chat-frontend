import { NavLink, Outlet } from "react-router-dom";
import defaultUser from "../assets/default-user.jpg";
import { useAuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import Modal from "../components/Modal/Modal";
import useShow from "../hooks/useShow";
import Profile from "./Home/Profile";

function Admin() {
  const { authUser } = useAuthContext();
  const [showProfile, toggleShowProfile] = useShow();
  const { logout } = useAuth();
  return (
    <>
      <div className="bg-gray-950 text-white p-4 flex justify-between">
        <i className="text-xl mr-4">Chat website</i>
        <div className="group relative">
          <img
            src={authUser.avatar ? authUser.avatar : defaultUser}
            className="size-8 rounded-full"
            alt=""
          />
          <div className="absolute bg-gray-100 text-black invisible group-hover:visible top-9 right-0 transition-all rounded-md overflow-hidden">
            <div
              className="py-2 px-6 hover:bg-gray-300 cursor-pointer"
              onClick={toggleShowProfile}
            >
              Profile
            </div>
            <div
              className="py-2 px-6 hover:bg-gray-300 cursor-pointer"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex flex-col p-2 w-32 gap-2">
          <NavLink
            className=" p-2 rounded hover:bg-gray-300"
            to={"/admin/users"}
          >
            Users
          </NavLink>
          <NavLink
            className=" p-2 rounded hover:bg-gray-300"
            to={"/admin/groups"}
          >
            Groups
          </NavLink>
        </div>
        <div className="flex-1  p-4">
          <Outlet />
        </div>
      </div>
      <Modal open={showProfile} onClose={toggleShowProfile}>
        <Profile />
      </Modal>
    </>
  );
}

export default Admin;
