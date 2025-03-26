// models/messageModel.js
import { getColorFromUsername } from "../utils/helpers.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/messages.json");

export async function saveMessage(topic, message) {
  try {
    let data = {};

    try {
      const content = await fs.readFile(dataPath, "utf-8");
      data = JSON.parse(content);
    } catch {
      // File may not exist or be empty, can ignore
    }

    if (!data[topic]) {
      data[topic] = [];
    }

    data[topic].push(message);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to save message:", err);
    throw err;
  }
}

export async function getMessagesByTopic(topic) {
  try {
    const content = await fs.readFile(dataPath, "utf-8");
    const data = JSON.parse(content);

    if (!data[topic]) return [];

    return data[topic].map((msg) => ({
      ...msg,
      color: msg.color || getColorFromUsername(msg.username),
    }));
  } catch (err) {
    console.error("Failed to load messages:", err);
    return [];
  }
}
