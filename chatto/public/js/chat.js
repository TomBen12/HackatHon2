const socket = io();

// Join the chat room
socket.emit("joinRoom", { topic });

// Send message
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message !== "") {
    socket.emit("chatMessage", message);
    input.value = "";
  }
});

socket.on("message", (data) => {
  const el = document.createElement("div");
  el.innerHTML = `<strong style="color: ${data.color}">${
    data.username
  }</strong>: ${data.message} <small>${new Date(
    data.timestamp
  ).toLocaleTimeString()}</small>`;
  chatBox.appendChild(el);
});

// socket.on("loadMessages", (messages) => {
//   messages.forEach((data) => {
//     const el = document.createElement("div");
//     el.innerHTML = `<strong style="color: ${data.color}">${
//       data.username
//     }</strong>: ${data.message} <small>${new Date(
//       data.timestamp
//     ).toLocaleTimeString()}</small>`;
//     chatBox.appendChild(el);
//   });
// });
