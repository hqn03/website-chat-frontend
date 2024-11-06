import React, { useState } from "react";
import { apiChangePassword, apiUpdateProfile } from "../api";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

function useProfile() {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const update = async (formData) => {
    setLoading(true);
    try {
      const { data } = await apiUpdateProfile(formData);
      toast.success("Update profile successfully.");
      const test = {
        ...authUser,
        ...data,
      };
      localStorage.setItem("userInfo", JSON.stringify(test));
      setAuthUser(test);
    } catch (error) {
      console.log(error);
      toast.error("Something go wrong.");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (formData) => {
    setLoading(true);
    try {
      console.log(formData);
      if (formPasswordValidated(formData)) {
        return;
      }
      const { data } = await apiChangePassword(formData);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something go wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, update, changePassword };
}

const formPasswordValidated = (formData) => {
  for (const key in formData) {
    if (!formData[key].trim()) {
      toast.error("Plese fill all field.");
      return true;
    }
  }
  if (formData.new_password !== formData.confirm_password) {
    toast.error("Confirm password do not match.");
    return true;
  }
  return false;
};

export default useProfile;
