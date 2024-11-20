import React from "react";

function Chat() {
  return (
    <div className="h-full flex justify-between gap-2">
      <div className="bg-white flex-1 rounded-lg flex flex-col overflow-hidden">
        <div className="flex p-2 gap-4 items-center border-b-2">
          <div className="size-12 bg-slate-300 rounded-full "></div>
          <div className="flex-1">Name room</div>
          <div>add user</div>
          <div>call</div>
        </div>
        <div className="flex-1 ">box messages</div>
        <div className="p-4 flex gap-2 border-t-2">
          <input
            type="text"
            className="border border-gray-700 flex-1  rounded-md px-2"
          />
          <button className="bg-blue-500 text-white py-1 px-4 rounded-md">
            Send
          </button>
        </div>
      </div>
      <div className="bg-blue-300 basis-[360px] rounded-lg">Layout 2</div>
    </div>
  );
}

export default Chat;
