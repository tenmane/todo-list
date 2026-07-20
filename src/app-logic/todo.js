import { activeProj } from "../dom/DOMControl.js";
import { editing } from "../dom/DOMControl.js";
import { TodoDOM } from "../dom/DOMControl.js";


class CreateTodo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    CreateTodo.todo.push(this);
  }
  static todo = [];
}

const one = new CreateTodo("Gym", "Go to the gym at 8pm", new Date(), "high");

const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;

  if (!editing) {
    const toDo = new CreateTodo(title, description, date, priority);
    activeProj.todos.push(toDo);
    TodoDOM.listTodo(toDo);
    TodoDOM.closeTodoModal();
    toDo.created = true;
  }
  else {
    TodoDOM.sumbitTodoEdit();
    TodoDOM.closeTodoModal();
  }
})

const cancelBtn = document.querySelector(".cancel-todo");
cancelBtn.addEventListener("click", function (e) {
  TodoDOM.closeTodoModal();
})