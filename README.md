# Kanban Board - Appzeto Machine Round

## Backend Setup

### Install Backend Dependencies

```bash
npm install express mongoose cors dotenv socket.io
npm install -D nodemon
```

Or install all dependencies from `package.json`:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/kanban-board-Appzeto
```

### Run Backend Server

```bash
nodemon server.js
```

or

```bash
npm run dev
```

---

## Frontend Setup

### Install Frontend Dependencies

```bash
npm install react react-dom socket.io-client react-router-dom
npm install
```

If the project was created using Vite, install Vite dependencies:

```bash
npm install
```

### Run Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Complete Backend Dependencies

```json
{
  "cors": "^latest",
  "dotenv": "^latest",
  "express": "^latest",
  "mongoose": "^latest",
  "socket.io": "^latest"
}
```

### Development Dependencies

```json
{
  "nodemon": "^latest"
}
```

---

## Complete Frontend Dependencies

```json
{
  "react": "^latest",
  "react-dom": "^latest",
  "react-router-dom": "^latest",
  "socket.io-client": "^latest"
}
```

---

## Install Everything

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Start Application

### Terminal 1 (Backend)

```bash
cd backend
nodemon server.js
```

### Terminal 2 (Frontend)

```bash
cd frontend
npm run dev
```
