import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
      });
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
    const res = await fetch("http://localhost:5000/api/todos", {
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
                <li
                  className="todo-item"
                  key={t._id}
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    color: t.completed ? "gray" : "black",
                  }}
                >
                  {t.title}{" "}
                  <div className="btn-group">
                    <button
                      className={`todo-btn ${t.completed ? "undo" : "done"}`}
                      onClick={() => completeTodo(t._id, setTodo)}
                      style={{ margin: "5px" }}
                    >
                      {t.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      className="todo-btn delete"
                      onClick={() => deleteTodo(setTodo, t._id)}
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

async function completeTodo(id, setTodo) {
  const res = await fetch("http://localhost:5000/api/todos/", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToComplete: id }),
  });
  const updatedTodo = await res.json();
  console.log(updatedTodo);
  setTodo((t) =>
    t.map((toDo) => (toDo._id === id ? updatedTodo.result : toDo))
  );
}

async function deleteTodo(setTodo, id) {
  await fetch("http://localhost:5000/api/todos/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToDelete: id }),
  });
  setTodo((t) => t.filter((td) => td._id != id));
}

export default App;
