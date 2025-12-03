"use client";
import clsx from "clsx";
import React, { useRef } from "react";

interface InputProps {
  placeholder?: string;

  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

function PromptDiv({ className }: { className?: string }) {
  return (
    <div className="relative w-full h-full ">
      <PromptInput className={className} placeholder="Ask Anything..." />
    </div>
  );
}

function PromptInput({
  placeholder = "",
  className,
  value,
  onChange,
}: InputProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "auto"; // reset for shrinking
    el.style.height = `${el.scrollHeight}px`; // grow
  };
  return (
    <div className={clsx("prompt-wrapper", className)}>
      <textarea
        ref={ref}
        onInput={handleInput}
        className="prompt-input overflow-y-auto resize-none w-full"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={2}
      />
      <button
        disabled={!value?.trim()}
        className="absolute right-2 bottom-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}

export { PromptInput, PromptDiv };
