import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ChatIcon, LogoutIcon, ProfileIcon } from "../components/Icon";
import useAuth from "../hooks/useAuth";

const GroupLink = () => (
  <div className="text-center">
    <NavLink
      to={"/chat"}
      className="my-1 block hover:text-white hover:bg-gray-700 rounded p-1 cursor-pointer"
    >
      <ChatIcon className="size-8 mx-auto" />
      <span className="text-sm">All chat</span>
    </NavLink>
    <NavLink
      to={"/profile"}
      className="my-1 block hover:text-white hover:bg-gray-700 rounded p-1 cursor-pointer"
    >
      <ProfileIcon className="size-8 m-auto" />
      <span className="text-sm">Profile</span>
    </NavLink>
  </div>
);

function Home({ children }) {
  const { authUser } = useAuthContext();
  const { logout } = useAuth();

  return (
    <div className="h-screen bg-gray-950 flex">
      {/* sidebar */}
      <div className="w-20 text-gray-700 flex flex-col justify-between p-2 ">
        <img className="size-14 mx-auto" src="" alt="" />
        <GroupLink />
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
    </div>
  );
}

export default Home;
