import Todo, { type Itodo } from "../models/Todo.js";
import type { Request, Response } from "express";

export async function getTodos(req: Request, res: Response): Promise<void> {
  try{
  const todoList = await Todo.find();
  res.json(todoList);
  }catch(err){
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function addTodo(req: Request, res: Response): Promise<void> {
  try{
  if (req.body.title != "") {
    const {title} = req.body as {title?: string};
    if (await Todo.findOne({ title })) {
      res.status(409).json({ message: "todo's title already exists" });
      return;
    }
    const todo = await Todo.create({ title });
    res.status(201).json({ message: "Todo created", todo });
  } else {
    res.status(400).send({ error: "Text cannot be empty" });
    return;
  }
} catch(err){
    res.status(500).json({message: "Internal Server Error"});
  }

}

export async function deleteTodo(req: Request, res:Response) {

  try{
  const {idToDelete} = req.body as {idToDelete?: string};
    if(idToDelete=="" || !idToDelete){
      res.status(400).json({message: "Invalid ID"});
      return;
    }
  const del = await Todo.findByIdAndDelete(idToDelete);
  if (!del) {
    res.status(404).json({ message: "todo not found!!" });
    return;
  }
  else{
    res.json({ message: "todo Deleted successfully!" });
  }
} catch(err){
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function completeTodo(req: Request, res: Response): Promise<void> {
  try{

  const {idToComplete} = req.body as {idToComplete?: string}  ;
  const td = await Todo.findById(idToComplete);
  if (!td) {
    res.status(404).json({ message: "todo's doesn't exists" });
    return;
  }

  const result = td.completed
    ? await Todo.findByIdAndUpdate(
        idToComplete,
        { completed: false },
        { new: true }
      )
    : await Todo.findByIdAndUpdate(
        idToComplete,
        { completed: true },
        { new: true }
      );

  console.log(result);
  res.json({ message: "Todo updated successfully", result });
} catch(err){ 
    res.status(500).json({message: "Internal Server Error"});
  }
}
