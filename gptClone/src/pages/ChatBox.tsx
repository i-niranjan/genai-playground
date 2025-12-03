import React from "react";
import { PromptDiv, PromptInput } from "../ui/promptInput";

function ChatBox() {
  return (
    <div className="h-screen  w-full flex justify-center p-2">
      <div className=" relative overflow-y-auto max-w-2xl w-full border-l border-r border-neutral-300  p-10">
        <div className="  flex flex-col gap-2 pb-32">
          <AgentMessage msg=" How Are you ?" />
          <UserMessage msg="Hello ?" />

          <AgentMessage msg=" How Are you ?" />
        </div>

        <div className="fixed   inset-x-0 bottom-10 flex items-center justify-center">
          <div className="max-w-2xl  w-full flex justify-center">
            <PromptInput
              placeholder="Howdyyyy!!"
              className="backdrop-blur-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const UserMessage = ({ msg }: { msg: string }) => {
  return (
    <div className="w-full ">
      <div className="bg-neutral-100 rounded-sm shadow-xs px-4 py-1 w-max">
        {msg}
      </div>
    </div>
  );
};

const AgentMessage = ({ msg }: { msg: string }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="bg-neutral-300 rounded-sm shadow-xs  px-4 py-1 w-max">
        {msg}
      </div>
    </div>
  );
};

export default ChatBox;
