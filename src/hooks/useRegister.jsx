import { useState } from "react";
import { apiRegister } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (formData) => {
    setLoading(true);

    try {
      if (!checkFormError(formData)) {
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

  return { loading, register };
}

function checkFormError(formData) {
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

export default useRegister;
