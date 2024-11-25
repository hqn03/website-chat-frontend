import { toast } from "react-toastify";
import {
  apiCreateRoom,
  apiDeleteRoom,
  apiGetRooms,
  apiUpdateRoom,
  apiAddUserToRoom,
} from "../api";
import { useState } from "react";

function useRoom() {
  const [loading, setLoading] = useState(false);

  const getRooms = async () => {
    try {
      setLoading(true);
      const { data } = await apiGetRooms();
      return data;
    } catch (error) {
      toast.error("Can't get list room.");
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (name) => {
    setLoading(true);
    try {
      const params = { name: name };
      const { data } = await apiCreateRoom(params);
      toast.success("Create room successfully.");
      return data;
    } catch (error) {
      toast.error("Create room failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateRoom = async (formData) => {
    setLoading(true);
    try {
      const { data } = await apiUpdateRoom(formData);
      toast.success("Update room succcessfully.");
      return data;
    } catch (error) {
      toast.error("Update room failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (formData) => {
    setLoading(true);
    try {
      const { data } = await apiDeleteRoom(formData.id);
      toast.success("Delete room successfully.");
      return true;
    } catch (error) {
      toast.error("Delete room failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addUserToRoom = async (formData) => {
    setLoading(true);
    try {
      const { data } = await apiAddUserToRoom(formData);
      toast.success("Add user to room successfully.");
      console.log(data);
      return true;
    } catch (error) {
      toast.error("Add user to room failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    addUserToRoom,
  };
}

export default useRoom;
