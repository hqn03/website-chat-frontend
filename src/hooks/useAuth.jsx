import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiForgot, apiLogin, apiRegister, apiReset } from "../api";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      setLoading(true);
      if (checkFormLogin(formData)) {
        return;
      }
      const { data } = await apiLogin(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login successful.");
      data.role === "admin" ? navigate("/admin") : navigate("/chat");
    } catch (error) {
      console.log(error);
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

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

  const register = async (formData) => {
    setLoading(true);

    try {
      if (!checkFormRegister(formData)) {
        const { data } = await apiRegister(formData);
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (formData) => {
    setLoading(true);

    try {
      if (!formData.email.trim()) {
        toast.error("Plese fill email field .");
        return;
      }

      const { data } = await apiForgot(formData);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    } finally {
      setLoading(false);
    }
  };

  const reset = async (formData) => {
    setLoading(true);
    try {
      if (!formData.new_password.trim()) {
        toast.error("Please fill new password field.");
        return;
      }

      const { data } = await apiReset(formData);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something go wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, logout, register, sendEmail, reset };
}

function checkFormLogin(formData) {
  for (const key in formData) {
    if (!formData[key].trim()) {
      toast.error("Plese fill all field.");
      return true;
    }
  }
  return false;
}

function checkFormRegister(formData) {
  for (const key in formData) {
    if (!formData[key].trim()) {
      toast.error("Plese fill all field.");
      return true;
    }
  }
  if (formData.password != formData.confirmPassword) {
    toast.error("Confirm password do not match.");
    return true;
  }
  return false;
}

export default useAuth;
