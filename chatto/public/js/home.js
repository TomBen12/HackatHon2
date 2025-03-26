const form = document.getElementById("create-room-form");
const input = document.getElementById("topicInput");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const topic = input.value.trim();
  if (topic) {
    window.location.href = `/chat/${encodeURIComponent(topic)}`;
  }
});

function getColorFromTopic(topic) {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = topic.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 60%, 70%)`;
  return color;
}

document.querySelectorAll(".topic-button").forEach((btn) => {
  const topic = btn.dataset.topic;
  btn.style.color = getColorFromTopic(topic);
});
