import { getProjects } from "./project.js";
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

export function makeTodo(title, description, dueDate, priority, projectID) {
  const toDo = new CreateTodo(title, description, dueDate, priority, projectID);
  saveProject(CreateTodo.todo);
  return toDo;
}

