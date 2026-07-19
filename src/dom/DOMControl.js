import projectsArray from "../app-logic/project.js";
import todoArray from "../app-logic/todo.js";
import deleteIconLocation from "../images/icons/delete.svg";

const DOMgetter = {
  container: document.querySelector(".content"),
  projectContainer: document.querySelector(".projects-holder"),
  contentHeading: document.querySelector(".content-heading"),
  todoBtn: document.querySelector(".add-todo"),
  projectsContainer: document.querySelector(".projects-btn-container"),
  todoModal: document.querySelector("#todo-modal"),
  todoForm: document.querySelector("#todo-form"),
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
      const selectedProj = projectsArray.find(proj => proj.name === project.textContent);
      ProjectDOM.displayProject(selectedProj);
    })

    deleteBtn.addEventListener("click", function () {
      const index = projectsArray.findIndex(proj => proj.name === name);
      ProjectDOM.deleteProject(index);
      projectBox.remove();
    })
  },

  toggleVisibility: function (container) {
    container.classList.toggle("active");
  },

  displayProject: function (selectedProj) {
    const title = document.querySelector(".project-title");
    title.textContent = selectedProj.name;
    activeProj = selectedProj;
  },

  deleteProject: function (index) {
    projectsArray.splice(index, 1);
  },
}

let activeProj = null;

export const TodoDOM = {
  addTodo: function () {
    DOMgetter.todoForm.addEventListener("click", function () {

    })
  },
  listTodo: function () {

  },
}


DOMgetter.projectsContainer.addEventListener("click", function () {
  ProjectDOM.toggleVisibility(DOMgetter.projectContainer);
});

DOMgetter.todoBtn.addEventListener("click", function () {
  DOMgetter.todoModal.showModal();
})