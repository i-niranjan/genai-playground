import React from "react";
import { PromptInput } from "../ui/promptInput";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-100 w-3xl gap-8 flex items-center justify-center flex-col">
        <h2 className="text-3xl md:text-4xl text-stone-900 font-semibold ">
          What are you working on ?
        </h2>
        <div className="w-full flex justify-center">
          <PromptInput placeholder="Ask Anything..." />
        </div>
      </div>
    </div>
  );
}
