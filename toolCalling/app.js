import { configDotenv } from "dotenv";
import Groq from "groq-sdk";
import readline from "node:readline/promises";
import { tavily } from "@tavily/core";
configDotenv();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = new tavily({ apiKey: process.env.TAVILY_API_KEY });
(async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages = [
    {
      role: "system",
      content: `You are Jarvis, a smart personal assistant who answers the asked questions
          ***If you call a tool, respond ONLY using the official structured JSON format. ***
          ***Use search tool only when something out of you're database knowledge is needed. Mostly try to solve the answers on you're trained data. rather than relying on search tools ***
            ***Either call a tool or use database knowledge. Don't do things simultaneously to generate a output***

            current UTC date and time : ${new Date().toUTCString()},
            `,
    },
    // {
    //   role: "user",
    //   content: "hi",
    // },
  ];

  while (true) {
    const question = await rl.question("You : ");
    if (question === "bye") {
      break;
    }
    messages.push({
      role: "user",
      content: question,
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

      messages.push(comp.choices[0].message);

      const toolCalls = comp.choices[0]?.message?.tool_calls;

      if (!toolCalls) {
        console.log(JSON.stringify(comp.choices[0].message.content, null, 2));
        break;
      }

      for (const tool of toolCalls) {
        const functionName = tool.function.name;
        const functionParams = tool.function.arguments;

        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(functionParams));
          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: functionName,
            content: toolResult,
          });
        }
      }
    }
  }
  rl.close();
})();

async function webSearch({ query }) {
  console.log("Calling Web Search");

  const response = await tvly.search(query);
  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");

  return finalResult;
}
