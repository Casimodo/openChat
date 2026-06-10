# Open Community Chat

> Plateforme de communication communautaire open source développée en Node.js, Express, EJS et Socket.IO.

L'objectif de ce projet est de proposer une plateforme de communication moderne, libre et auto-hébergeable tout en restant accessible aux développeurs débutants.

---

## Philosophie du projet

Ce projet a été conçu autour d'une idée simple :

La simplicité favorise l'apprentissage.

De nombreux projets modernes deviennent rapidement difficiles à comprendre à cause :

- des frameworks complexes ;
- des outils de build ;
- des systèmes de compilation ;
- des dizaines de dépendances.

L'objectif ici est différent :

```bash
git clone ...
npm install
npm start
Petit projet de chat multi utilisateur en temps réel avec :

- **Node.js** : exécute JavaScript côté serveur.
- **npm** : installe les dépendances du projet.
- **Express** : serveur web HTTP.
- **EJS** : moteur de template HTML côté serveur.
- **Socket.IO** : communication temps réel client ↔ serveur via WebSocket avec fallback automatique.

## Fonctionnalités

- Choix d'un pseudo.
- Messages temps réel entre plusieurs utilisateurs.
- Liste des utilisateurs connectés.
- Indicateur “écrit...”.
- Historique court des derniers messages côté serveur.
- Interface moderne, responsive desktop/mobile.

## Structure

```txt
chat-express-ejs-socketio/
├── public/
│   ├── css/style.css        # Design responsive
│   └── js/chat.js           # Code client Socket.IO
├── src/server.js            # Serveur Express + Socket.IO
├── views/index.ejs          # Page HTML générée par EJS
├── package.json             # Scripts et dépendances npm
├── .gitignore
└── README.md
```

---

## Pourquoi ces technologies ?

## Node.js
Node.js permet d'utiliser JavaScript côté serveur.

> ### Avantages
> - Un seul langage pour tout le projet.
> - Excellentes performances pour les applications temps réel.
> - Très grande communauté.
> - Écosystème npm très riche.

## Express
Express est volontairement choisi pour sa simplicité.

> ### Avantages
> - Léger.
> - Rapide.
> - Facile à apprendre.
> - Très documenté.

## EJS
EJS est un moteur de template simple.

> ### Avantages
> - Très proche du HTML classique.
> - Aucun build.
> - Aucune compilation.
> - Très facile à comprendre.

## Socket.IO
Socket.IO est utilisé pour le temps réel.

> ### Avantages
> - Gestion simplifiée des WebSockets.
> - Reconnexion automatique.
> - Très adapté aux chats multi-utilisateurs.

## Pourquoi React, Vue, Angular ou Svelte ne sont pas utilisés ?

> Ces outils sont excellents mais apportent souvent :
> - une étape de compilation ;
> - un système de build ;
> - davantage de dépendances ;
> - davantage de complexité.
>
> L'objectif du projet est de permettre aux débutants d'apprendre les fondamentaux du Web :
> - HTML
> - CSS
> - JavaScript
> - DOM
> - HTTP
> - WebSockets

Une fois ces bases maîtrisées, apprendre un framework devient beaucoup plus simple.

---

# Vision du projet

> Le projet démarre sous la forme d'un simple chat temps réel.
> À terme il pourra évoluer vers :
> 
> - Salons multiples
> - Messages privés
> - Gestion des rôles
> - Partage de fichiers
> - Plugins
> - Bots
> - Appels vocaux
> - Appels vidéo
> - Fédération de serveurs
> - Applications mobiles

---

## Installation depuis un PC vierge

### 1. Installer Git

Git permet de récupérer le projet.

Windows :

```bash
winget install --id Git.Git -e --source winget
```

macOS avec Homebrew :

```bash
brew install git
```

Ubuntu / Debian :

```bash
sudo apt update
sudo apt install git -y
```

Vérification :

```bash
git --version
```

### 2. Installer Node.js et npm

Installe la version **LTS** de Node.js. npm est inclus avec Node.js.

Windows :

```bash
winget install OpenJS.NodeJS.LTS --source winget
```

macOS avec Homebrew :

```bash
brew install node
```

Ubuntu / Debian, méthode simple :

```bash
sudo apt update
sudo apt install nodejs npm -y
```

> Pour un vrai environnement développeur Linux, tu peux aussi utiliser `nvm` ou NodeSource afin d'avoir une version LTS récente.

Vérification :

```bash
node -v
npm -v
```

### 3. Récupérer le projet Git

```bash
git clone https://github.com/TON_COMPTE/chat-express-ejs-socketio.git
cd chat-express-ejs-socketio
```

Si tu as téléchargé le ZIP, décompresse-le puis ouvre un terminal dans le dossier du projet.

### 4. Installer les dépendances

```bash
npm install
```

### 5. Lancer le serveur

Mode normal :

```bash
npm start
```

Mode développement avec redémarrage automatique :

```bash
npm run dev
```

Ouvre ensuite :

```txt
http://localhost:3000
```

Pour tester le multi utilisateur, ouvre deux navigateurs ou deux onglets privés.

## Comment fonctionne la techno

### Express

Express sert la page web et les fichiers statiques : CSS, JS client, images éventuelles.

Dans `src/server.js` :

```js
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
  res.render('index', { appName: 'Modern Chat' });
});
```

### EJS

EJS génère le HTML côté serveur. Dans ce projet, il injecte par exemple le nom de l'application :

```ejs
<title><%= appName %></title>
```

### Socket.IO

Socket.IO garde une connexion ouverte entre le navigateur et le serveur.

Client vers serveur :

```js
socket.emit('chat:message', { text });
```

Serveur vers tous les clients :

```js
io.emit('chat:message', message);
```

## Limites volontaires du projet

Ce projet reste volontairement simple :

- pas de base de données ;
- pas d'authentification ;
- historique perdu au redémarrage serveur ;
- pseudo non réservé ;
- protection XSS basique côté client et serveur.

## Améliorations possibles

- Ajouter une base de données SQLite, PostgreSQL ou MongoDB.
- Ajouter une vraie authentification.
- Ajouter plusieurs salons.
- Ajouter des messages privés.
- Ajouter une modération.
- Ajouter Docker.

## Phrases utiles en anglais

- “I cloned the project and installed the dependencies.”
- “The server is running on port 3000.”
- “Open two browser tabs to test multiple users.”
- “Socket.IO sends messages in real time.”

## Phrases utiles en tagalog

- “Na-clone ko na ang project.” = J'ai cloné le projet.
- “Tumatakbo ang server sa port 3000.” = Le serveur tourne sur le port 3000.
- “Buksan ang dalawang tab para subukan ang chat.” = Ouvre deux onglets pour tester le chat.
