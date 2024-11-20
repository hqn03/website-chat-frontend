import { useState } from "react";
import {
  apiCreateUser,
  apiDeleteUser,
  apiGetUsers,
  apiUpdateRole,
} from "../api";
import { toast } from "react-toastify";

function useUser() {
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await apiGetUsers();
      return data;
    } catch (error) {
      toast.error("Can't get list user.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (formData) => {
    try {
      setLoading(true);
      const { data } = await apiCreateUser(formData);
      toast.success("Add user successfully");
      return data;
    } catch (error) {
      toast.error("Add user failed.");
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (formData) => {
    try {
      setLoading(true);
      const { data } = await apiUpdateRole(formData);
      toast.success(data.message);
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Update role failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (formData) => {
    try {
      setLoading(true);
      const { data } = await apiDeleteUser(formData.id);
      toast.success("Delete user successfull.");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Delete user failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUsers, createUser, updateRole, deleteUser };
}

export default useUser;
