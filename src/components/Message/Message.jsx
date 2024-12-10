import { useAuthContext } from "../../context/AuthContext";

function Message(props) {
  const { me, time, message, user, old_file, file, id, deleteMessage, is_pinned, handlePinToggle } = props;
  const {authUser} = useAuthContext();

  const getFileNameFromUrl = (url) => {
    if (!url || typeof url !== 'string') {
      // console.error("URL is invalid or not a string");
      return null;
    }
    return url.split('/').pop();
  };
  const file_name_old = getFileNameFromUrl(old_file);
  const file_name = getFileNameFromUrl(file);
  return me ? (
    <div className="flex gap-2 flex-row-reverse mt-1">
      <div className="max-w-[60%]">
        <p className=" bg-blue-200 p-2 rounded-lg">{message}</p>
        <a href={old_file} download className="text-blue-500">{file_name_old}</a>
        {file && (
          <a
            href={file}
            download={file}
            className="text-blue-500"
          >
            {file_name}
          </a>
        )}
        <p className="text-end">{time}</p>
      </div>
      {authUser.role === 'moderate' && 
        // <span onClick={() => deleteMessage(id)} className="bg-red-400 h-7 p-1">Delete</span>
        <span
          onClick={() => deleteMessage(id)}
          className="bg-gray-500 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      }
      {authUser.role === 'moderate' && (
        <span
          onClick={() => handlePinToggle(id, !is_pinned)}
          className={`${
            is_pinned ? "bg-yellow-500" : "bg-gray-500"
          } text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h11m4.38 3.38L15 12m-2-2 2 2m-3.38-6.38L9 5m-2 2 2-2M21 21H3"
            />
          </svg>
        </span>
      )}

    </div>
  ) : (
    <div className="flex gap-2 mt-1 items-center">
      <img
        className="size-9 rounded-full object-cover mb-1"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s"
        alt="avatar"
      />
      <div className="max-w-[60%]">
        <p>{user?.username}</p>
        <p className="bg-gray-200 p-2 rounded-lg">{message}</p>
        <a href={old_file} download className="text-blue-500">{file_name_old}</a>
        {file && (
          <a
            href={file}
            download={file}
            className="text-blue-500"
          >
            {file_name}
          </a>
        )}
        <p>{time}</p>
      </div>
      {authUser.role === 'moderate' && 
        // <span onClick={() => deleteMessage(id)} className="bg-red-400 h-7 p-1">Delete</span>
        <span
          onClick={() => deleteMessage(id)}
          className="bg-gray-500 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      }
      {authUser.role === 'moderate' && (
        <span
          onClick={() => handlePinToggle(id, !is_pinned)}
          className={`${
            is_pinned ? "bg-yellow-500" : "bg-gray-500"
          } text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h11m4.38 3.38L15 12m-2-2 2 2m-3.38-6.38L9 5m-2 2 2-2M21 21H3"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

export default Message;
