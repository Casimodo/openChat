const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;
const MAX_MESSAGES_HISTORY = 50;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = new Map();
const messagesHistory = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    appName: 'Modern Chat'
  });
});

function sanitizeText(value, maxLength = 500) {
  return String(value ?? '')
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
}

function buildUserList() {
  return Array.from(users.values()).map((user) => ({
    id: user.id,
    name: user.name
  }));
}

function addMessageToHistory(message) {
  messagesHistory.push(message);

  if (messagesHistory.length > MAX_MESSAGES_HISTORY) {
    messagesHistory.shift();
  }
}

function emitUsersUpdate() {
  io.emit('users:update', buildUserList());
}

io.on('connection', (socket) => {
  socket.emit('chat:history', messagesHistory);

  socket.on('user:join', (rawName) => {
    const name = sanitizeText(rawName, 24) || `Invité-${socket.id.slice(0, 4)}`;

    users.set(socket.id, {
      id: socket.id,
      name
    });

    socket.broadcast.emit('system:message', `${name} a rejoint le chat.`);
    emitUsersUpdate();
  });

  socket.on('chat:message', (payload) => {
    const user = users.get(socket.id);
    const text = sanitizeText(payload?.text, 500);

    if (!user || !text) return;

    const message = {
      id: `${Date.now()}-${socket.id}`,
      userId: socket.id,
      author: user.name,
      text,
      createdAt: new Date().toISOString()
    };

    addMessageToHistory(message);
    io.emit('chat:message', message);
  });

  socket.on('typing:start', () => {
    const user = users.get(socket.id);
    if (user) socket.broadcast.emit('typing:update', `${user.name} écrit...`);
  });

  socket.on('typing:stop', () => {
    socket.broadcast.emit('typing:update', '');
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);

    if (user) {
      users.delete(socket.id);
      socket.broadcast.emit('system:message', `${user.name} a quitté le chat.`);
      emitUsersUpdate();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Serveur lancé : http://localhost:${PORT}`);
});
