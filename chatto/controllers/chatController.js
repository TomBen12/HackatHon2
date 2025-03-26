
import { getRecentTopics } from "../utils/helpers.js";
import { getMessagesByTopic } from "../models/messageModel.js";


export async function renderHome(req, res) {
  try {
    const recentTopics = await getRecentTopics();
    res.render("index", { recentTopics });
  } catch (err) {
    console.error("Error rendering homepage:", err);
    res.status(500).send("Something went wrong.");
  }
}

export async function joinChatRoom(req, res) {
  try {
    const topic = req.params.topic;
    const messages = await getMessagesByTopic(topic);
    res.render("chat", { topic, messages });
  } catch (err) {
    console.error("Error joining chat room:", err);
    res.status(500).send("Could not load chat room.");
  }
}
