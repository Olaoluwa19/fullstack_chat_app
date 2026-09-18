import app from "./src/app";
import mongoose from "mongoose";
import { connectDB } from "./src/config/database";
import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    // connect to mongoDB
    connectDB();
    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB ☑️");
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT} 🚀🚀`);
      });
    });
  } catch (error) {
    console.error(
      `Error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

startServer();
