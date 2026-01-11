import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "./config";
import type { Todo } from "./types/todo";
import { fetchTodos, completeTodo, deleteTodo } from "./api/todo";

function App() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    fetchTodos().then((data) => setTodo(data));
  }, []);

  const addTodo = async () => {
    if (text.trim() === "") alert("Todo's title is empty!");
    if (
      todo.some(
        (t) =>
          t.title.trim().toLocaleLowerCase() === text.trim().toLocaleLowerCase()
      )
    ) {
      alert("This todo already exists!");
      return;
    }
    const res = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text }),
    });
    const newTodo = await res.json();
    console.log(newTodo);
    setTodo((t) => [...t, newTodo.todo]);
    setText("");
  };
  return (
    <>
      <div className="app">
        <h1 className="title">Todo App</h1>
        <br />
        <div className="todo-card">
          <ul
            className="todo-list"
            style={{ listStyle: "none", margin: "2px" }}
          >
            {todo.map((t) => {
              return (
                <li className="todo-item" key={t._id}>
                  <span
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                      color: t.completed ? "gray" : "black",
                      marginRight: "10px",
                    }}
                  >
                    {t.title}{" "}
                  </span>
                  <div className="btn-group">
                    <button
                      className={`todo-btn ${t.completed ? "undo" : "done"}`}
                      onClick={() => completeTodo(t._id).then((updatedTodo) => {
                        setTodo((prevTodos) =>
                          prevTodos.map((todoItem) =>
                            todoItem._id === t._id ? updatedTodo : todoItem
                          )
                        );
                      })}
                      style={{ margin: "5px" }}
                    >
                      {t.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      className="todo-btn delete"
                      onClick={() => deleteTodo(t._id).then(() => {
                        setTodo((prevTodos) =>
                          prevTodos.filter((todoItem) => todoItem._id !== t._id)
                        );
                      })}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Buy groceries..."
          ></input>
          <button style={{ marginLeft: "5px" }} type="button" onClick={addTodo}>
            Add Todo
          </button>
        </div>
      </div>
    </>
  );
}


export default App;
