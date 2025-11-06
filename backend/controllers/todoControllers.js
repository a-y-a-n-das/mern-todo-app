import Todo from "../models/Todo.js";

export async function getTodos(req, res) {
  const todoList = await Todo.find();
  res.json(todoList);
}

export async function addTodo(req, res) {
  if (req.body.text != "") {
    const text = req.body.title;
    if (await Todo.findOne({ title: text })) {
      res.status(409).json({ message: "todo's title already exists" });
      return;
    }
    const obj = new Todo({ title: text });
    await obj.save();
    res.status(201).json({ message: "Todo created", todo: obj });
  } else {
    res.status(400).send({ error: "Text cannot be empty" });
    return;
  }
}

export async function deleteTodo(req, res) {
  const idToDelete = req.body.idToDelete;
  const del = await Todo.findByIdAndDelete(idToDelete);
  if (!del) {
    res.status(404).json({ message: "todo not found!!" });
  }
  res.json({ message: "todo Deleted successfully!" });
}

export async function completeTodo(req, res) {
  const idToComplete = req.body.idToComplete;
  const td = await Todo.findById(idToComplete);
  if (!td) {
    res.status(404).json({ message: "todo's doesn't exists" });
    return;
  }

  const result = td.completed
    ? await Todo.findByIdAndUpdate(idToComplete, { completed: false }, {new: true})
    : await Todo.findByIdAndUpdate(idToComplete, { completed: true }, {new: true});

  console.log(result);
  res.json({ message: "Todo updated successfully", result });
}

