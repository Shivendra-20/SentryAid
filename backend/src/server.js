import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Config & DB
import { env, assertEnv } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { runDevSeed } from "./config/devSeed.js";

assertEnv();

// Routes
import userRoutes from "./routes/userRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import BulletinMsgRoutes from "./routes/BulletinMsgRoutes.js";

const app = express();
const corsOptions =
  env.clientOrigin === "*"
    ? { origin: true }
    : { origin: env.clientOrigin, credentials: true };

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    env: env.nodeEnv,
    port: env.port,
  });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/bulletinMsg", BulletinMsgRoutes);

// Create HTTP server for socket.io
const server = http.createServer(app);

const socketCors =
  env.clientOrigin === "*"
    ? { origin: "*" }
    : { origin: env.clientOrigin, credentials: true };

const io = new Server(server, { cors: socketCors });

// Reject socket connections without a valid JWT
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Authentication required"));
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    socket.data.user = { id: payload.id, type: payload.type };
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
});

// ========== SOCKET.IO ==========

// Store active connections: { room: { senderId: { receivers: Set, name: string } } }
const activeConnections = new Map();
// Store user names: { socketId: name }
const userNames = new Map();

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Set username
  socket.on("set_name", (name) => {
    userNames.set(socket.id, name);
    console.log(`User ${socket.id} set name: ${name}`);
  });

  // Join a room — replay pending SOS requests to late joiners (e.g. volunteer opens page after user)
  socket.on("join_room", (room) => {
    socket.join(room);
    const userName = userNames.get(socket.id) || "Unknown";
    console.log(`User ${socket.id} (${userName}) joined room: ${room}`);

    const roomConnections = activeConnections.get(room);
    if (roomConnections) {
      roomConnections.forEach((senderData, senderId) => {
        socket.emit("request_connection", {
          senderId,
          senderName: senderData.name,
        });
      });
    }
  });

  // Sender requests connection
  socket.on("request_connection", ({ room }) => {
    if (!activeConnections.has(room)) {
      activeConnections.set(room, new Map());
    }
    const roomConnections = activeConnections.get(room);
    if (!roomConnections.has(socket.id)) {
      roomConnections.set(socket.id, {
        receivers: new Set(),
        name: userNames.get(socket.id),
      });
    }
    socket.to(room).emit("request_connection", {
      senderId: socket.id,
      senderName: userNames.get(socket.id),
    });
  });

  // Receiver accepts connection
  socket.on("accept_connection", ({ room, senderId }) => {
    if (
      activeConnections.has(room) &&
      activeConnections.get(room).has(senderId)
    ) {
      const roomConnections = activeConnections.get(room);
      const senderData = roomConnections.get(senderId);
      senderData.receivers.add(socket.id);

      socket.to(senderId).emit("accept_connection", {
        receiverId: socket.id,
        receiverName: userNames.get(socket.id),
      });
    }
  });

  // Receiver rejects connection
  socket.on("reject_connection", ({ room, senderId }) => {
    if (
      activeConnections.has(room) &&
      activeConnections.get(room).has(senderId)
    ) {
      const roomConnections = activeConnections.get(room);
      const senderData = roomConnections.get(senderId);

      if (senderData.receivers.has(socket.id)) {
        senderData.receivers.delete(socket.id);
      }

      socket.to(senderId).emit("reject_connection", {
        receiverId: socket.id,
        receiverName: userNames.get(socket.id),
      });
    }
  });

  // Sender disconnects from receivers
  socket.on("disconnect_from_receivers", ({ room }) => {
    if (
      activeConnections.has(room) &&
      activeConnections.get(room).has(socket.id)
    ) {
      const roomConnections = activeConnections.get(room);
      const senderData = roomConnections.get(socket.id);

      senderData.receivers.forEach((receiverId) => {
        socket.to(receiverId).emit("sender_disconnected", {
          senderId: socket.id,
          senderName: userNames.get(socket.id),
        });
        socket.to(receiverId).emit("clear_chat", {
          senderId: socket.id,
          senderName: userNames.get(socket.id),
        });
      });

      roomConnections.delete(socket.id);
      if (roomConnections.size === 0) {
        activeConnections.delete(room);
      }
    }
  });

  // Location sharing
  socket.on("share_location", ({ room, location }) => {
    if (
      activeConnections.has(room) &&
      activeConnections.get(room).has(socket.id)
    ) {
      const senderData = activeConnections.get(room).get(socket.id);
      senderData.receivers.forEach((receiverId) => {
        socket.to(receiverId).emit("receive_location", {
          location,
          senderId: socket.id,
          senderName: userNames.get(socket.id),
        });
      });
    }
  });

  socket.on("stop_location_sharing", ({ room }) => {
    if (
      activeConnections.has(room) &&
      activeConnections.get(room).has(socket.id)
    ) {
      const senderData = activeConnections.get(room).get(socket.id);
      senderData.receivers.forEach((receiverId) => {
        socket.to(receiverId).emit("location_sharing_stopped", {
          senderId: socket.id,
          senderName: userNames.get(socket.id),
        });
      });
    }
  });

  // Chat messages
  socket.on("send_message", ({ room, message, timestamp }) => {
    if (
      activeConnections.has(room) &&
      activeConnections.get(room).has(socket.id)
    ) {
      const senderData = activeConnections.get(room).get(socket.id);
      senderData.receivers.forEach((receiverId) => {
        socket.to(receiverId).emit("receive_message", {
          senderId: socket.id,
          senderName: userNames.get(socket.id),
          message,
          timestamp,
        });
      });
    } else {
      const roomConnections = activeConnections.get(room);
      if (roomConnections) {
        const senderEntry = Array.from(roomConnections.entries()).find(
          ([, data]) => data.receivers.has(socket.id)
        );
        if (senderEntry) {
          const [senderId, senderData] = senderEntry;
          const allParticipants = new Set([senderId, ...senderData.receivers]);
          allParticipants.forEach((participantId) => {
            if (participantId !== socket.id) {
              socket.to(participantId).emit("receive_message", {
                senderId: socket.id,
                senderName: userNames.get(socket.id),
                message,
                timestamp,
              });
            }
          });
        }
      }
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    const userName = userNames.get(socket.id);
    console.log(`User Disconnected: ${socket.id} (${userName})`);

    activeConnections.forEach((roomConnections, room) => {
      roomConnections.forEach((senderData, senderId) => {
        if (senderId === socket.id) {
          senderData.receivers.forEach((receiverId) => {
            socket.to(receiverId).emit("clear_chat", {
              senderId: socket.id,
              senderName: userNames.get(socket.id),
            });
          });
          roomConnections.delete(senderId);
        } else if (senderData.receivers.has(socket.id)) {
          senderData.receivers.delete(socket.id);
        }
      });
      if (roomConnections.size === 0) {
        activeConnections.delete(room);
      }
    });

    userNames.delete(socket.id);
  });
});

// Connect DB and start server
connectDB()
  .then(() => runDevSeed())
  .then(() => {
    server.listen(env.port, () => {
      console.log(`🚀 Server started on port ${env.port} (${env.nodeEnv})`);
      console.log(`   Health: http://localhost:${env.port}/api/health`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  });
