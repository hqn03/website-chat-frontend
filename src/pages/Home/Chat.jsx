import { useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { apiDeleteUserFromRoom, apiGetMessage, apiGetUserAddToRoom, apiGetUserDeleteFromRoom } from "../../api";
import Rooms from "./Rooms";
import useShow from "../../hooks/useShow";
import Modal from "../../components/Modal/Modal";
import useRoom from "../../hooks/useRoom";
import useShowDelete from "../../hooks/useShowDelete";

function Chat() {
  const { roomName } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const { authUser } = useAuthContext();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersDeleteList, setUsersDeleteList] = useState([]);

  const userId = authUser.id;

  const [addUser, toggleAddUser] = useShow();
  const [deleteUser, toggleDeleteUser] = useShowDelete();
  const [form, setForm] = useState({});
  const { loading, addUserToRoom, deleteUserFromRoom } = useRoom();

  const messagesEndRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const encodeFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Chỉ lấy dữ liệu Base64
      reader.onerror = (error) => reject(error);
    });
  };
  

  useEffect(() => {
    apiGetUserAddToRoom(roomName).then(({ data }) => setUsers(data));
  }, [addUser]);

  useEffect(() => {
    apiGetUserDeleteFromRoom(roomName).then(({ data }) => setUsers(data));
  }, [deleteUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useLayoutEffect(() => {
    apiGetMessage(roomName).then(({ data }) => setMessages(data));

    setForm({ room: roomName, user: null });
    if (roomName) {
      const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
      setSocket(ws);

      // ws.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   console.log(data);
      //   setMessages((prev) => [...prev, data]);
      // };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
      
        if (data.action === "delete_message") {
          setMessages((prevMessages) =>
            prevMessages.filter((message) => message.id !== data.message_id)
          );
        } else if (data.action === "pin_message") {
            setMessages((prevMessages) =>
              prevMessages.map((message) =>
                message.id === data.message_id
                  ? { ...message, is_pinned: true }
                  : message
              )
            );
        } else if (data.action === "unpin_message") {
            setMessages((prevMessages) =>
              prevMessages.map((message) =>
                message.id === data.message_id
                  ? { ...message, is_pinned: false }
                  : message
              )
            );
        }
        else {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      };
      ws.onopen = () => {
        console.log("WebSocket Connected room,", roomName);
      };

      ws.onclose = () => console.log("da thoat room: ", roomName);

      return () => ws.close();
    }
  }, [roomName]);

  //   Fucntion gui messsage
  const sendMessage = async (e) => {
    e.preventDefault();

    if (socket && (message.trim() !== "" || selectedFile)) {

      let fileData = null;
      if (selectedFile) {
        try {
          const encodedFile = await encodeFileToBase64(selectedFile);
          fileData = {
            name: selectedFile.name,
            type: selectedFile.type,
            data: encodedFile,
          };
          console.log(fileData)
        } catch (err) {
          console.error("Error encoding file:", err);
          return;
        }
      }

      socket.send(
        JSON.stringify({
          room: roomName,
          content: message,
          user: userId,
          file: fileData,
        })
      );
      setMessage("");
      setSelectedFile(null);
    }
  };

  const deleteMessage = (messageId) => {
    if (socket) {
      socket.send(
        JSON.stringify({
          action: "delete_message",
          message_id: messageId,
        })
      );
    }
  };

  const pinMessage = (messageId, isPinned) => {
    if (socket) {
      socket.send(
        JSON.stringify({
          action: "pin_message",
          message_id: messageId,
          is_pinned: isPinned,
        })
      );
    }
  };

  const handlePinToggle = (messageId, isPinned) => {
    
    // setMessages((prevMessages) =>
    //     prevMessages.map((msg) =>
    //         msg.id === messageId ? { ...msg, is_pinned: !msg.is_pinned } : msg
    //   )
    // );

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? { ...msg, is_pinned: !msg.is_pinned }
          : msg
      )
    );
    
    pinMessage(messageId, isPinned);
    
  };
  

  const handleSubmitForm = (e) => {
    e.preventDefault();
    addUserToRoom(form);
  };
  const handleSubmitFormDelete = (e) => {
    e.preventDefault();
    console.log(form);
    deleteUserFromRoom(form.room, form.user);
  };


  // console.log(messages);

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
                Add user
              </div>
            )}
            {authUser.role === "moderate" && (
              <div
                className="hover:bg-slate-300 cursor-pointer"
                onClick={() => toggleDeleteUser()}
              >
                Delete user
              </div>
            )}

            <div>Call</div>
          </div>
          <div className="pinned-messages bg-yellow-100 p-2">
              <h3>Pinned Messages</h3>
              {messages
                .filter((msg) => msg.is_pinned && msg.content)
                .map((pinnedMessage) => (
                  <Message
                    key={pinnedMessage.id}
                    message={pinnedMessage.content}
                    old_file = {pinnedMessage.attachment}
                    file={pinnedMessage.file}
                    is_pinned={true}
                  />
                ))}
          </div>
          <div ref={messagesEndRef} className="flex-1 p-2 overflow-y-scroll">
            {messages
            .filter((msg) => msg.content)
            .map((message, index) => (
              <div>
                <Message
                  key={index}
                  user={users.find(i => i.id == message.user)}
                  me={message.user == authUser.id}
                  message={message.content}
                  old_file = {message.attachment}
                  file={message.file}
                  id = {message.id}
                  deleteMessage={(messageId) => deleteMessage(messageId)}
                  is_pinned={message.is_pinned}
                  handlePinToggle={(messageId, isPinned) => handlePinToggle(messageId, isPinned)}
                />
              </div>
            ))}
          </div>
          <form className="p-4 flex gap-2 border-t-2" onSubmit={sendMessage}>
            <input
              type="text"
              className="border border-gray-700 flex-1  rounded-md px-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <input
              type="file"
              className="border border-gray-700"
              onChange={(e) => handleFileChange(e)}
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
      <Modal open={deleteUser} onClose={toggleDeleteUser}>
        <form className="w-[400px] flex gap-2" onSubmit={handleSubmitFormDelete}>
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
            Delete
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Chat;
