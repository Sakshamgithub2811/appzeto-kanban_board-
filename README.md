# Setup Instructions

## Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root directory and add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/kanban-board-Appzeto
```

4. Start the backend server using Nodemon:

```bash
nodemon server.js
```

Or, if you have a script in `package.json`:

```bash
npm run dev
```

---

## Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL shown in the terminal (usually):

```text
http://localhost:5173
```

---

## Requirements

- Node.js installed
- MongoDB running locally
- Nodemon installed globally (optional)

Install Nodemon globally:

```bash
npm install -g nodemon
```
