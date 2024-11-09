import { NavLink, Outlet } from "react-router-dom";
import defaultUser from "../assets/default-user.jpg";

function Admin() {
  return (
    <>
      <div className="bg-gray-950 text-white p-4 flex justify-between">
        <i className="text-xl mr-4">Chat website</i>
        <img src={defaultUser} className="size-8 rounded-full" alt="" />
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
    </>
  );
}

export default Admin;
