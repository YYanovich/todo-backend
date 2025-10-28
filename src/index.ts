import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import type { Request, Response } from "express";
import todoRoute from "./routes/todoRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use((req, _res, next) => {
  try {
    console.log(
      `[request] ${req.method} ${req.originalUrl} origin=${req.headers.origin}`
    );
  } catch (e) {
    console.log("[request] logger error", e);
  }
  next();
});

app.get("/healthz", (req: Request, res: Response) => {
  const mongoReady = mongoose.connection.readyState === 1; 
  res.json({
    ok: true,
    mongoConnected: mongoReady,
    env: process.env.NODE_ENV || "development",
  });
});
app.use("/api/todos", todoRoute);

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => {
    console.error("Data base error: ", err);
    console.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  });

server.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
