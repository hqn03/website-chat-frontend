function Message(props) {
  const { me, time, message, user } = props;
  return me ? (
    <div className="flex gap-2 flex-row-reverse">
      <div className="max-w-[60%]">
        <p className=" bg-blue-200 p-2 rounded-lg">{message}</p>
        <p className="text-end">{time}</p>
      </div>
    </div>
  ) : (
    <div className="flex gap-2">
      <img
        className="size-9 rounded-full object-cover mb-1"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s"
        alt="avatar"
      />
      <div className="max-w-[60%]">
        <p className="bg-gray-200 p-2 rounded-lg">{message}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default Message;
