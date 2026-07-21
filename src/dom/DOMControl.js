import { saveProject } from "../app-logic/local-storage.js";
import { getProjects, makeProject } from "../app-logic/project.js";
import { makeTodo } from "../app-logic/todo.js";
import deleteIconLocation from "../images/icons/delete.svg";
import editIconLocation from "../images/icons/edit.svg";

export let activeProj = null;
export let editing = false;
let getIndex = null;
let getProject = null;

const DOMgetter = {
  container: document.querySelector(".content"),
  projectContainer: document.querySelector(".projects-holder"),
  contentHeading: document.querySelector(".content-heading"),
  todoBtn: document.querySelector(".add-todo"),
  projectsContainer: document.querySelector(".projects"),
  todoModal: document.querySelector("#todo-modal"),
  todoForm: document.querySelector("#todo-form"),
  todoList: document.querySelector("#todo-list"),
}

export const ProjectDOM = {
  listProject: function (name) {
    const projectBox = document.createElement("div");
    projectBox.classList.add("project-box");

    const project = document.createElement("li");
    project.classList.add("listed-project");
    project.textContent = name;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIconLocation;
    deleteIcon.alt = "Delete";
    deleteBtn.append(deleteIcon);

    projectBox.append(project, deleteBtn);

    DOMgetter.projectContainer.append(projectBox);

    project.addEventListener("click", function () {
      const selectedProj = getProjects().find(proj => proj.name === project.textContent);
      DOMgetter.todoList.innerHTML = "";
      ProjectDOM.displayProject(selectedProj);
    })

    deleteBtn.addEventListener("click", function () {
      const index = getProjects().findIndex(proj => proj.name === name);
      ProjectDOM.deleteProject(index);
      projectBox.remove();
    })
  },

  toggleVisibility: function (container) {
    container.classList.toggle("active");
  },

  displayProject: function (selectedProj) {
    activeProj = selectedProj;
    const title = document.querySelector(".project-title");
    title.textContent = selectedProj.name;
    TodoDOM.displayTodos(selectedProj);
  },

  deleteProject: function (index) {
    getProjects().splice(index, 1);
    saveProject(getProjects());
  },

  getProjectById: function (projectID) {
    return getProjects().find(proj => proj.id === projectID);
  }
}

export const TodoDOM = {
  listTodo: function (toDo) {
    let todoContainer, todoContent, todoButtons, title, description, dueDate, priority, todoHeader, deleteTodo, deleteIcon, editTodo, editIcon;

    if (!editing) {
      todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-container");

      todoContent = document.createElement("div");
      todoContent.classList.add("todo-content");

      todoButtons = document.createElement("div");
      todoButtons.classList.add("todo-buttons");

      title = document.createElement("h2");
      title.textContent = toDo.title;
      title.classList.add("todo-title");
      toDo.titleElement = title;

      description = document.createElement("p");
      description.textContent = toDo.description;
      description.classList.add("todo-description");
      toDo.descriptionElement = description;

      dueDate = document.createElement("span");
      dueDate.textContent = toDo.dueDate;
      dueDate.classList.add("todo-date");
      toDo.dateElement = dueDate;

      priority = document.createElement("span");
      priority.textContent = toDo.priority;
      priority.classList.add("todo-priority");
      toDo.priorityElement = priority;

      todoHeader = document.createElement("div");
      todoHeader.classList.add("todo-header");

      deleteTodo = document.createElement("button");
      deleteTodo.classList.add("delete-btn");
      deleteIcon = document.createElement("img");
      deleteIcon.src = deleteIconLocation;
      deleteIcon.alt = "Delete";
      deleteTodo.append(deleteIcon);

      editTodo = document.createElement("button");
      editTodo.classList.add("edit-btn");
      editIcon = document.createElement("img");
      editIcon.src = editIconLocation;
      editIcon.alt = "Edit";
      editTodo.append(editIcon);

      todoHeader.append(toDo.titleElement, toDo.priorityElement);
      todoButtons.append(editTodo, deleteTodo);
      todoContent.append(todoHeader, toDo.descriptionElement, toDo.dateElement);
      todoContainer.append(todoContent, todoButtons);

      DOMgetter.todoList.append(todoContainer);

      deleteTodo.addEventListener("click", function () {
        const index = TodoDOM.getTodoIndex(toDo);
        TodoDOM.deleteTodo(toDo, index);
        todoContainer.remove();
      })

      editTodo.addEventListener("click", function () {
        const index = TodoDOM.getTodoIndex(toDo);
        TodoDOM.editTodo(toDo, index);
      })
    }

    else {
      toDo.titleElement.textContent = toDo.title;
      toDo.descriptionElement.textContent = toDo.description;
      toDo.dateElement.textContent = toDo.dueDate;
      toDo.priorityElement.textContent = toDo.priority;
    }

  },
  closeTodoModal: function () {
    DOMgetter.todoModal.close();
    DOMgetter.todoForm.reset();
  },
  displayTodos: function (selectedProj) {
    for (let i = 0; i < selectedProj.todos.length; i++) {
      TodoDOM.listTodo(selectedProj.todos[i]);
    }
  },
  deleteTodo: function (toDo, index) {
    const project = ProjectDOM.getProjectById(toDo.projectID);
    project.todos.splice(index, 1);
    saveProject(getProjects());
  },
  editTodo: function (toDo, index) {
    editing = true;
    getProject = ProjectDOM.getProjectById(toDo.projectID);
    getIndex = index;

    const title = getProject.todos[index].title;
    const description = getProject.todos[index].description;
    const date = getProject.todos[index].dueDate;
    const priority = getProject.todos[index].priority;

    document.querySelector("#title").value = title;
    document.querySelector("#description").value = description;
    document.querySelector("#date").value = date;
    document.querySelector("#priority").value = priority;

    DOMgetter.todoModal.showModal();
  },
  submitTodoEdit: function () {
    getProject.todos[getIndex].title = document.querySelector("#title").value;
    getProject.todos[getIndex].description = document.querySelector("#description").value;
    getProject.todos[getIndex].dueDate = document.querySelector("#date").value;
    getProject.todos[getIndex].priority = document.querySelector("#priority").value;

    this.listTodo(getProject.todos[getIndex]);
    editing = false;
  },
  getTodoIndex: function (toDo) {
    const project = ProjectDOM.getProjectById(toDo.projectID);
    const index = project.todos.findIndex(todo => todo === toDo);
    return index;
  },
  clearContent: function () {
    DOMgetter.todoList.innerHTML = "";
  },
  setAllTaskTitle: function () {
    const title = document.querySelector(".project-title");
    title.textContent = "All Tasks";
  }
}


DOMgetter.projectsContainer.addEventListener("click", function () {
  ProjectDOM.toggleVisibility(DOMgetter.projectContainer);
});

DOMgetter.todoBtn.addEventListener("click", function () {
  DOMgetter.todoModal.showModal();
})

const projectsQuantity = JSON.parse(localStorage.getItem("projects") || "[]");
if (projectsQuantity.length === 0) {
  const defaultProject = makeProject("Default");
}

const projForm = document.querySelector("#project-form");
projForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector("#add-project");
  const project = makeProject(input.value);
  ProjectDOM.listProject(project.name);
  input.value = "";
  saveProject(getProjects());
})

const cancelBtn = document.querySelector(".cancel-todo");
cancelBtn.addEventListener("click", function (e) {
  TodoDOM.closeTodoModal();
})

const allTasks = document.querySelector(".all-tasks");
allTasks.addEventListener("click", function () {
  TodoDOM.clearContent();
  TodoDOM.setAllTaskTitle();
  for (let i = 0; i < getProjects().length; i++) {
    getProjects()[i].todos.forEach(todo => TodoDOM.listTodo(todo));
  }
})

const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;

  if (!editing) {
    const toDo = makeTodo(title, description, date, priority, activeProj.id);
    activeProj.todos.push(toDo);
    TodoDOM.listTodo(toDo);
    TodoDOM.closeTodoModal();
    toDo.created = true;
  }
  else {
    TodoDOM.submitTodoEdit();
    TodoDOM.closeTodoModal();
  }
  saveProject(getProjects());
})