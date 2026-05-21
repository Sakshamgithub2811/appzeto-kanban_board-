module.exports = function socketHandler(io) {
  const boardUsers = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-board", ({ boardId, userId }) => {
      socket.join(boardId);

      socket.data.boardId = boardId;
      socket.data.userId = userId;

      if (!boardUsers[boardId]) {
        boardUsers[boardId] = [];
      }

      if (!boardUsers[boardId].includes(userId)) {
        boardUsers[boardId].push(userId);
      }

      io.to(boardId).emit("online-members", boardUsers[boardId]);
    });

    socket.on("typing", ({ boardId, user }) => {
      socket.to(boardId).emit("typing", user);
    });

    socket.on("disconnect", () => {
      const boardId = socket.data.boardId;
      const userId = socket.data.userId;

      if (boardId && userId && boardUsers[boardId]) {
        boardUsers[boardId] = boardUsers[boardId].filter(
          (user) => user !== userId
        );

        io.to(boardId).emit("online-members", boardUsers[boardId]);
      }

      console.log("User disconnected:", socket.id);
    });
  });
};