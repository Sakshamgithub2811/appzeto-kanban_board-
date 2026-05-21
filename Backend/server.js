const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");

const boardRoutes = require("./routes/board.routes");
const taskRoutes = require("./routes/task.routes");
const socketHandler = require("./socket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

socketHandler(io);

app.use("/boards", boardRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Kanban Board Backend Running");
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});