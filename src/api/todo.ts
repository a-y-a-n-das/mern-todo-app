import { BASE_URL } from "../config";
import type { Todo } from "../types/todo";


export async function  fetchTodos(): Promise<Todo[]> {
    const res =  await fetch(`${BASE_URL}/api/todos`)
    const data = await res.json()
    return data as Todo[];
}


export async function completeTodo(id: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToComplete: id }),
  });
  const updatedTodo = await res.json();
  console.log(updatedTodo);
  return updatedTodo
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToDelete: id }),
  });
  return await res.json();
}

