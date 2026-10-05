import express from "express";
import path from "path";

import { clerkMiddleware } from "@clerk/express";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoute.js";
import chatRoutes from "./routes/chatRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoute.js";

const app = express();

app.use(express.json());

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

//serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "..", "web", "dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "web", "dist", "index.html"));
  });
}

export default app;
