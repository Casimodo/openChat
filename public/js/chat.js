const socket = io();

const joinCard = document.querySelector('#joinCard');
const usernameInput = document.querySelector('#username');
const joinButton = document.querySelector('#joinButton');
const usersList = document.querySelector('#usersList');
const messages = document.querySelector('#messages');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const sendButton = document.querySelector('#sendButton');
const typingIndicator = document.querySelector('#typingIndicator');

let currentUserName = '';
let typingTimeoutId = null;

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function formatTime(isoDate) {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(isoDate));
}

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function addSystemMessage(text) {
  const element = document.createElement('div');
  element.className = 'system-message';
  element.textContent = text;
  messages.appendChild(element);
  scrollToBottom();
}

function addChatMessage(message) {
  const isMine = message.author === currentUserName;
  const article = document.createElement('article');

  article.className = `message ${isMine ? 'message--mine' : ''}`;
  article.innerHTML = `
    <div class="message__bubble">
      <div class="message__meta">
        <strong>${escapeHtml(message.author)}</strong>
        <span>${formatTime(message.createdAt)}</span>
      </div>
      <p>${escapeHtml(message.text)}</p>
    </div>
  `;

  messages.appendChild(article);
  scrollToBottom();
}

function renderUsers(users) {
  usersList.innerHTML = '';

  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user.name;
    usersList.appendChild(li);
  });
}

function joinChat() {
  const name = usernameInput.value.trim();
  if (!name) return;

  currentUserName = name;
  socket.emit('user:join', name);

  joinCard.classList.add('is-hidden');
  messageInput.disabled = false;
  sendButton.disabled = false;
  messageInput.focus();
}

joinButton.addEventListener('click', joinChat);

usernameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') joinChat();
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text) return;

  socket.emit('chat:message', { text });
  socket.emit('typing:stop');
  messageInput.value = '';
  messageInput.focus();
});

messageInput.addEventListener('input', () => {
  socket.emit('typing:start');

  clearTimeout(typingTimeoutId);
  typingTimeoutId = setTimeout(() => {
    socket.emit('typing:stop');
  }, 700);
});

socket.on('chat:history', (history) => {
  history.forEach(addChatMessage);
});

socket.on('chat:message', addChatMessage);
socket.on('system:message', addSystemMessage);
socket.on('users:update', renderUsers);
socket.on('typing:update', (text) => {
  typingIndicator.textContent = text;
});
