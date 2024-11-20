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
import Groups from "./pages/Admin/Groups";
import Users from "./pages/Admin/Users";

function App() {
  const { authUser } = useAuthContext();

  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={1000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              authUser.role === "admin" ? (
                <Navigate to={"/admin"} />
              ) : (
                <Navigate to={"/"} />
              )
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="password-reset-confirm/:uid/:token" element={<Reset />} />

        <Route path="/" element={<Home />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<Navigate to="/admin/users" />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/groups" element={<Groups />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
