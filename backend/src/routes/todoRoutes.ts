import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/", deleteTodo);
router.patch("/", completeTodo);

export default router;
