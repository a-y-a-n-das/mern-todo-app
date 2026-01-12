/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";     
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import todoRoutes from "./src/routes/todoRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());         

app.use("/api/todos", todoRoutes);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
