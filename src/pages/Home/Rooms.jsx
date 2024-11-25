import { useEffect, useState } from "react";
import { apiGetRoomsUser } from "../../api";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function Rooms() {
  const { authUser } = useAuthContext();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { roomName } = useParams();

  useEffect(() => {
    apiGetRoomsUser(authUser.id).then(({ data }) => setRooms(data));
  }, []);

  return (
    <div className="bg-white w-0 lg:basis-[360px] rounded-lg overflow-hidden">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`px-4 py-2 hover:bg-slate-50 ${
            roomName == room.room && "!bg-gray-300"
          }`}
          onClick={() => navigate(`/chat/${room.room}`)}
        >
          {room.room}
        </div>
      ))}
    </div>
  );
}

export default Rooms;
