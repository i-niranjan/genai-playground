import React, { useState } from "react";
import { PromptInput } from "../ui/promptInput";
import { callLLM } from "../services/callLLM";

function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  async function inputValue(value: string) {
    if (!value) return;

    setMessages((prev) => [...prev, { role: "user", text: value }]);
    setInput("");
    setLoading(true);

    try {
      const res = await callLLM(value);

      setMessages((prev) => [...prev, { role: "agent", text: res.message }]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <div className="h-screen w-full flex justify-center p-2">
      <div className="relative overflow-y-auto max-w-2xl w-full border-l border-r border-neutral-300 p-10">
        <div className="flex flex-col gap-2 pb-32">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <UserMessage key={i} msg={msg.text} />
            ) : (
              <AgentMessage key={i} msg={msg.text} />
            )
          )}

          {loading && <LoadingMessage />}
        </div>

        <div className="fixed inset-x-0 bottom-10 flex items-center justify-center">
          <div className="max-w-2xl w-full flex justify-center">
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

const UserMessage = ({ msg }: { msg: string }) => (
  <div className="w-full">
    <div className="bg-neutral-100 rounded-sm shadow-xs px-4 py-1 w-max">
      {msg}
    </div>
  </div>
);

const AgentMessage = ({ msg }: { msg: string }) => (
  <div className="w-full flex justify-end">
    <div className="bg-neutral-300 max-w-sm rounded-sm shadow-xs px-4 py-1 w-max">
      {msg}
    </div>
  </div>
);

const LoadingMessage = () => (
  <div className="w-full flex justify-end">
    <div className="bg-neutral-300 animate-pulse rounded-sm shadow-xs px-4 py-1 w-max">
      Thinking...
    </div>
  </div>
);

export default ChatBox;
