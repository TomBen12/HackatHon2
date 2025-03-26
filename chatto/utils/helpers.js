import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/messages.json");

export async function getRecentTopics() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const messages = JSON.parse(data);
    return Object.keys(messages).slice(-5).reverse(); // last 5 topics
  } catch (err) {
    console.error("Error reading recent topics:", err);
    return [];
  }
}

export function getRandomUsername() {
  const number = Math.floor(Math.random() * 1000);
  return `Anonymous${number}`;
}

export function getColorFromUsername(username) {
  if (!username) return "hsl(0, 0%, 100%)"; 
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 70%)`;
}