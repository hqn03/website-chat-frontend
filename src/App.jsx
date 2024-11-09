import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import Chat from "./pages/Home/Chat";
import Profile from "./pages/Home/Profile";
import Admin from "./pages/Admin";
import UserList from "./pages/Admin/Users/List";
import UserAdd from "./pages/Admin/Users/Add";
import Groups from "./pages/Admin/Groups";

function App() {
  const { authUser } = useAuthContext();

  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="reset-password/:uid/:token" element={<Reset />} />

        <Route path="/" element={<Home />}>
          <Route index path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          {/* <Route path="/admin" element={<Navigate to="/admin/users" />} /> */}
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/groups" element={<Groups />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
