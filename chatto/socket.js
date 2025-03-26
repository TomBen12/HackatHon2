import { saveMessage } from "./models/messageModel.js";
import { getRandomUsername } from "./utils/helpers.js";
import { getMessagesByTopic } from "./models/messageModel.js";
import { getColorFromUsername } from "./utils/helpers.js";

export function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("a user has connected");

    // When user joins a topic room
    socket.on("joinRoom", async ({ topic }) => {
      socket.join(topic);
      socket.username = getRandomUsername();
      socket.topic = topic;
      try {
        const pastMessages = await getMessagesByTopic(topic);
        socket.emit("loadMessages", pastMessages);
      } catch (err) {
        console.error("Error loading past messages:", err);
      }
    });

    // Handle incoming message
    socket.on("chatMessage", async (msg) => {
      const messageData = {
        username: socket.username,
        message: msg,
        timestamp: new Date().toISOString(),
        color: getColorFromUsername(socket.username),
      };

      try {
        await saveMessage(socket.topic, messageData);
        io.to(socket.topic).emit("message", messageData); // broadcast to room
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`${socket.username} disconnected`);
    });
  });
}
