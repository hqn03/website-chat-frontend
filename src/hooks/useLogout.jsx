import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function useLogout() {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    try {
      setAuthUser(null);
      localStorage.clear("userInfo");
      toast.success("Logout successfull.");
      navigate("/login");
    } catch (error) {
      toast.success("Lougout failed");
    }
  };
  return logout;
}

export default useLogout;
