import React, { useEffect, useState } from "react";
import { PromptInput } from "../ui/promptInput";

function ChatBox() {
  const [input, setInput] = useState("");
  const [userMsg, setUserMsg] = useState<string[]>([]);
  const [agentMsg, setAgentMsg] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function inputValue(value: string) {
    if (!value) return;
    setUserMsg((prev) => [...prev, value]);
    setInput("");
    setLoading(true);
    try {
      const response = await generateMsg(value);
      setAgentMsg((prev) => [...prev, response]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(loading);
  }, [loading]);

  async function generateMsg(msg: string) {
    return "hello";
  }

  return (
    <div className="h-screen  w-full flex justify-center p-2">
      <div className=" relative overflow-y-auto max-w-2xl w-full border-l border-r border-neutral-300  p-10">
        <div className="  flex flex-col gap-2 pb-32">
          {/* <AgentMessage msg=" How Are you ?" /> */}
          {userMsg.map((item, index) => (
            <UserMessage key={index} msg={item} />
          ))}
          {loading && <LoadingMessage />}
          {agentMsg.map((item, index) => (
            <AgentMessage key={index} msg={item} />
          ))}

          {/* <AgentMessage msg=" How Are you ?" /> */}
        </div>

        <div className="fixed   inset-x-0 bottom-10 flex items-center justify-center">
          <div className="max-w-2xl  w-full flex justify-center">
            <PromptInput
              placeholder="Howdyyyy!!"
              className="backdrop-blur-2xl"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onSend={inputValue}
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
const LoadingMessage = () => {
  return (
    <div className="w-full flex justify-end">
      <div className="bg-neutral-300 animate-pulse rounded-sm shadow-xs  px-4 py-1 w-max">
        Thinking...
      </div>
    </div>
  );
};

export default ChatBox;
