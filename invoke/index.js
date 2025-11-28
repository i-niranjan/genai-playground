import { configDotenv } from "dotenv";

import Groq from "groq-sdk";

configDotenv();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

(async function main() {
  const comp = await groq.chat.completions.create({
    // temperature: 1,
    // top_p: 0.2,
    response_format: { type: "json_object" },
    // stop: "",
    // max_completion_tokens: 1000,
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are Jarvis, a smart review grader. Your task is to analyse given reviews sentiment Classify the review as postive, neutral or negative.
        You must return a valid JSON structure
        example : {"sentiment" : "Negative"}`,
      },
      {
        role: "user",
        content: `Review : These headphones arrived quickly and look great, but the left earcup stopped workign after a week.
        Sentiment : `,
      },
    ],
  });

  comp.choices.map((item) => {
    // console.log(JSON.stringify(item.message.content, null, 2));
    console.log(item.message.content);
  });
})();
