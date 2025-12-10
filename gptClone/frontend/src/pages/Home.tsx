import { useRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export default function Home() {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-100 w-3xl gap-8 flex items-center justify-center flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl text-stone-900 font-semibold"
        >
          What are you working on ?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className=" w-full flex justify-center"
        >
          <motion.div className={clsx("prompt-wrapper relative")}>
            <textarea
              ref={ref}
              onInput={handleInput}
              className="prompt-input overflow-y-auto resize-none w-full"
              // value={"value"}
              placeholder={"Ask Anything..."}
              rows={2}
            />
            <button
              // disabled={!value?.trim()}
              className="absolute right-2 z-50 bottom-2 p-2 rounded-lg bg-neutral-600 text-white hover:bg-neutral-900 duration-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
