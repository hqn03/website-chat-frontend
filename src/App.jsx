import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";

function App() {
  const { authUser } = useAuthContext();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="reset-password/:uid/:token" element={<Reset />} />

        <Route path="chat" element={<h1>hello {authUser.email}</h1>} />
        <Route path="admin" element={<h1>user</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
