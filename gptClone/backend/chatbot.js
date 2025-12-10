import { configDotenv } from "dotenv";
import Groq from "groq-sdk";

import { tavily } from "@tavily/core";
configDotenv();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = new tavily({ apiKey: process.env.TAVILY_API_KEY });

const sessions = new Map();
export async function generate(sessionId, userMessage) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, [
      {
        role: "system",
        content: `You are Jarvis, a smart personal assistant who answers the asked questions
          ***When calling a tool, use the official function-calling format, not plain JSON.
Do NOT manually output JSON. Let the system handle tool calls automatically.
 ***
          ***Use search tool only when something out of you're database knowledge is needed. Mostly try to solve the answers on you're trained data. rather than relying on search tools ***
            ***Either call a tool or use database knowledge. Don't do things simultaneously to generate a output***

            current UTC date and time : ${new Date().toUTCString()},
            `,
      },
      // {
      //   role: "user",
      //   content: "hi",
      // },
    ]);
  }

  const messages = sessions.get(sessionId);

  messages.push({
    role: "user",
    content: userMessage,
  });

  while (true) {
    const comp = await groq.chat.completions.create({
      temperature: 0,
      // response_format: { type: "json_object" },
      model: "llama-3.3-70b-versatile",

      messages: messages,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "Search the latest information and realtime data on the internet",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform search on",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });
    const msg = comp.choices[0].message;

    messages.push(msg);

    const toolCalls = msg.tool_calls;

    if (!toolCalls) {
      sessions.set(sessionId, messages);
      return msg.content;
    }

    for (const tool of toolCalls) {
      const fn = tool.function.name;
      const args = JSON.parse(tool.function.arguments);

      if (fn === "webSearch") {
        const result = await webSearch(args);

        messages.push({
          role: "tool",
          tool_call_id: tool.id,
          name: fn,
          content: result,
        });
      }
    }
  }
}

async function webSearch({ query }) {
  const response = await tvly.search(query);
  return response.results.map((r) => r.content).join("\n\n");
}
