import { activeProj } from "../dom/DOMControl.js";
import { editing } from "../dom/DOMControl.js";
import { TodoDOM } from "../dom/DOMControl.js";
import projectsArray from "./project.js";
import { saveProject } from "./local-storage.js";

class CreateTodo {
  constructor(title, description, dueDate, priority, projectID) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectID = projectID;
    CreateTodo.todo.push(this);
  }
  static todo = [];
}

const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;

  if (!editing) {
    const toDo = new CreateTodo(title, description, date, priority, activeProj.id);
    activeProj.todos.push(toDo);
    TodoDOM.listTodo(toDo);
    TodoDOM.closeTodoModal();
    toDo.created = true;
  }
  else {
    TodoDOM.submitTodoEdit();
    TodoDOM.closeTodoModal();
  }
  saveProject(projectsArray);
})

const cancelBtn = document.querySelector(".cancel-todo");
cancelBtn.addEventListener("click", function (e) {
  TodoDOM.closeTodoModal();
})

const allTasks = document.querySelector(".all-tasks");
allTasks.addEventListener("click", function () {
  TodoDOM.clearContent();
  TodoDOM.setAllTaskTitle();
  for (let i = 0; i < projectsArray.length; i++) {
    projectsArray[i].todos.forEach(todo => TodoDOM.listTodo(todo));
  }
})