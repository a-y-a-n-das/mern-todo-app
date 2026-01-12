/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";     
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import todoRoutes from "./src/routes/todoRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());         

app.use("/api/todos", todoRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
