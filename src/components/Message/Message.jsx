function Message(props) {
  const { me, time, message, user, old_file, file } = props;
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
    <div className="flex gap-2 flex-row-reverse">
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
    </div>
  );
}

export default Message;
