import { useState } from "react";
import { toast } from "react-toastify";
import { apiForgot, apiReset } from "../api";
import { useNavigate } from "react-router-dom";

function useReset() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  return { loading, sendEmail, reset };
}

export default useReset;
