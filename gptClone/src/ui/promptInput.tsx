"use client";
import clsx from "clsx";
import React, { useRef } from "react";

interface InputProps {
  placeholder?: string;

  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

function PromptDiv() {
  return (
    <div className="relative">
      <PromptInput placeholder="Ask Anything..." />
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
    </div>
  );
}

export { PromptInput, PromptDiv };

function Button(children: string) {
  return <button>{children}</button>;
}
