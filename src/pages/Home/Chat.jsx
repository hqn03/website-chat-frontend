import { useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

function Chat() {
  const { roomName } = useParams();

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const { authUser } = useAuthContext();

  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  const username = authUser.username;

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
      // setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.onopen = () => {
      console.log("WebSocket Connected room,", roomName);
    };

    ws.onclose = () => console.log("da thoat room: ", roomName);

    return () => ws.close();
  }, [roomName]);

  //   Fucntion gui messsage
  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.send(
        JSON.stringify({
          message,
          username,
        })
      );
      setMessage("");
    }
  };

  return (
    <div className="h-full flex justify-between gap-2">
      <div
        className="bg-blue-300 w-0 lg:basis-[360px] rounded-lg"
        onClick={() => navigate("/chat/123")}
      >
        Layout 2
      </div>
      {roomName ? (
        <div className="bg-white flex-1 rounded-lg flex flex-col overflow-hidden">
          <div className="flex p-2 gap-4 items-center border-b-2">
            <div className="size-12 bg-slate-300 rounded-full "></div>
            <div className="flex-1">Name room</div>
            <div>add user</div>
            <div>call</div>
          </div>
          <div className="flex-1 p-2">
            {messages.map((message, index) => (
              <Message
                me={message.username === authUser.username}
                key={index}
                message={message.message}
              />
            ))}
          </div>
          <div className="p-4 flex gap-2 border-t-2">
            <input
              type="text"
              className="border border-gray-700 flex-1  rounded-md px-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white flex-1 rounded-lg flex justify-center items-center">
          <p className="text-3xl font-medium">Please choose room</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
