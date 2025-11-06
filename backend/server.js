/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";     
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());         

app.use("/api/todos", todoRoutes);

// app.get("/", (req, res) => {
//   res.send("Server running...");
// });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
