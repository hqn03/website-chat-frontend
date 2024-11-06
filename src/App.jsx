import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route index path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
