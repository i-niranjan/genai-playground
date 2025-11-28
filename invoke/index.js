import { configDotenv } from "dotenv";

import Groq from "groq-sdk";

configDotenv();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

(async function main() {
  const comp = await groq.chat.completions.create({
    temperature: 1,
    top_p: 0.2,
    stop: "",
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are Jarvis, a smart personal assistant.",
      },
      {
        role: "user",
        content: "Hey",
      },
    ],
  });

  comp.choices.map((item) =>
    console.log(JSON.stringify(item.message.content, null, 2))
  );
})();
