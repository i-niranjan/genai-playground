import React, { useState, useEffect, useRef } from "react";
import { PromptInput } from "../ui/promptInput";
import { callLLM, getChat } from "../services/callLLM";
import { useLocation } from "react-router";
import { motion } from "motion/react";

function ChatBox() {
  const location = useLocation();
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const initialPrompt = location?.state?.prompt;
  const alreadySent = useRef(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const sessionId = localStorage.getItem("session_id");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      if (!sessionId) {
        setHistoryLoaded(true);
        return;
      }
      (async () => {
        const { messages } = await getChat();
        if (!messages) return;

        setMessages(messages);
        setHistoryLoaded(true);
      })();
    }
  }, []);

  useEffect(() => {
    if (historyLoaded) return;
    if (!initialPrompt) return;
    if (alreadySent.current) return;

    inputValue(initialPrompt);
    alreadySent.current = true;
  }, [initialPrompt]);

  async function inputValue(value: string) {
    if (!value) return;

    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setLoading(true);

    try {
      const res = await callLLM(value);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.message },
      ]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <div className="h-screen w-full flex justify-center p-2">
      <div className="relative overflow-y-auto max-w-2xl w-full  p-10">
        <div className="flex flex-col gap-2 pb-32">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <UserMessage key={i} msg={msg.content} index={i} />
            ) : (
              <AgentMessage key={i} msg={msg.content} index={i} />
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

const UserMessage = ({ msg, index }: { msg: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 50, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{
      duration: 0.3,
      ease: "easeOut",
      delay: index * 0.03,
    }}
    className="flex justify-end"
  >
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className="max-w-[75%] bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl rounded-tr-md px-5 py-3.5 shadow-md"
    >
      <p className="text-[15px] leading-relaxed">{msg}</p>
    </motion.div>
  </motion.div>
);

const AgentMessage = ({ msg, index }: { msg: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -50, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{
      duration: 0.3,
      ease: "easeOut",
      delay: index * 0.03,
    }}
    className="flex justify-start"
  >
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className="max-w-[75%] bg-white/90 backdrop-blur-sm text-slate-800 rounded-2xl rounded-tl-md px-5 py-3.5 shadow-md border border-slate-200/30"
    >
      <p className="text-[15px] leading-relaxed">{msg}</p>
    </motion.div>
  </motion.div>
);

const LoadingMessage = () => (
  <div className="flex justify-start animate-slideInLeft">
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl rounded-tl-lg px-5 py-3 shadow-sm border border-slate-200/50">
      <div className="flex space-x-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-slate-400 rounded-full"
            style={{
              animation: "bounce 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default ChatBox;
