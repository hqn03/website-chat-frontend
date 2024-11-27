import { useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { apiGetMessage, apiGetUserAddToRoom } from "../../api";
import Rooms from "./Rooms";
import useShow from "../../hooks/useShow";
import Modal from "../../components/Modal/Modal";
import useRoom from "../../hooks/useRoom";

function Chat() {
  const { roomName } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const { authUser } = useAuthContext();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const userId = authUser.id;

  const [addUser, toggleAddUser] = useShow();
  const [form, setForm] = useState({});
  const { loading, addUserToRoom } = useRoom();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    apiGetUserAddToRoom(roomName).then(({ data }) => setUsers(data));
  }, [addUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useLayoutEffect(() => {
    apiGetMessage(roomName).then(({ data }) => setMessages(data));

    setForm({ room: roomName, user: null });
    if (roomName) {
      const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
      setSocket(ws);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        setMessages((prev) => [...prev, data]);
      };

      ws.onopen = () => {
        console.log("WebSocket Connected room,", roomName);
      };

      ws.onclose = () => console.log("da thoat room: ", roomName);

      return () => ws.close();
    }
  }, [roomName]);

  //   Fucntion gui messsage
  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && message.trim() !== "") {
      socket.send(
        JSON.stringify({
          room: roomName,
          content: message,
          user: userId,
        })
      );
      setMessage("");
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    addUserToRoom(form);
  };

  return (
    <div className="h-full flex justify-between gap-2">
      <Rooms rooms={rooms} setRooms={setRooms} />
      {roomName ? (
        <div className="bg-white flex-1 rounded-lg flex flex-col overflow-hidden">
          <div className="flex p-2 gap-4 items-center border-b-2">
            <div className="size-12 bg-slate-300 rounded-full "></div>
            <div className="flex-1">
              {rooms.find((i) => i?.room == roomName)?.room_name}
            </div>
            {authUser.role === "moderate" && (
              <div
                className="hover:bg-slate-300 cursor-pointer"
                onClick={() => toggleAddUser()}
              >
                add user
              </div>
            )}

            <div>call</div>
          </div>
          <div ref={messagesEndRef} className="flex-1 p-2 overflow-y-scroll">
            {messages.map((message, index) => (
              <Message
                me={message.user == authUser.id}
                key={index}
                message={message.content}
              />
            ))}
          </div>
          <form className="p-4 flex gap-2 border-t-2" onSubmit={sendMessage}>
            <input
              type="text"
              className="border border-gray-700 flex-1  rounded-md px-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 rounded-md"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white flex-1 rounded-lg flex justify-center items-center">
          <p className="text-3xl font-medium">Please choose room</p>
        </div>
      )}
      <Modal open={addUser} onClose={toggleAddUser}>
        <form className="w-[400px] flex gap-2" onSubmit={handleSubmitForm}>
          <label>Select user</label>
          <select
            className="flex-1"
            onChange={(e) => {
              setForm({ ...form, user: e.target.value });
            }}
          >
            <option>Choose user</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.email}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-green-500 rounded"
            disabled={loading}
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Chat;
