import { useState } from "react";
import { apiLogin } from "../api";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      setLoading(true);
      if (!checkFormError(formData)) {
        const { data } = await apiLogin(formData);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setAuthUser(data);
        toast.success("Login successful.");
        navigate("/chat");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
}

function checkFormError(formData) {
  for (const key in formData) {
    if (!formData[key].trim()) {
      toast.error("Plese fill all field.");
      return true;
    }
  }
  return false;
}

export default useLogin;
