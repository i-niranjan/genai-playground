import axios from "axios";
import { getSessionId } from "../helper/utils";

const API_URL = import.meta.env.VITE_API_URL;

export async function callLLM(inputText: string) {
  const sessionId = getSessionId();
  try {
    const res = await axios.post(`${API_URL}/api/chat`, {
      message: inputText,
      sessionId,
    });
    return res.data;
  } catch (error) {
    console.error("❌ Server call failed:", error);
    throw error;
  }
}
export async function getChat() {
  const sessionId = getSessionId();

  try {
    const res = await axios.get(`${API_URL}/api/getChat`, {
      params: {
        sessionId,
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Server call failed:", error);
    throw error;
  }
}
