import express from "express";
import { generate, getMessages } from "./chatbot.js";
const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/api/getChat", async (req, res) => {
  const { sessionId } = req.body;
  const messages = await getMessages(sessionId);
  res.json({ messages: messages });
});

app.post("/api/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  const reply = await generate(sessionId, message);
  res.json({ message: reply });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
