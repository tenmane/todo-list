import projectsArray from "../app-logic/project.js";
import deleteIconLocation from "../images/icons/delete.svg";

const DOMgetter = {
  container: document.querySelector(".content"),
  projectContainer: document.querySelector(".projects-holder"),
}

export const DOMStuff = {
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
      DOMgetter.container.innerHTML = "";
      const selectedProj = projectsArray.find(proj => proj.name === project.textContent);
      DOMStuff.displayProject(selectedProj);
    })

    deleteBtn.addEventListener("click", function () {
      const index = projectsArray.findIndex(proj => proj.name === name);
      DOMStuff.deleteProject(index);
      projectBox.remove();
    })
  },
  toggleVisibility: function (container) {
    container.classList.toggle("active");
  },
  displayProject: function (selectedProj) {
    const title = document.createElement("h1");
    title.textContent = selectedProj.name;
    DOMgetter.container.append(title);
  },
  deleteProject: function (index) {
    projectsArray.splice(index, 1);
  }
}

const projectsContainer = document.querySelector(".projects-btn-container");
projectsContainer.addEventListener("click", function () {
  DOMStuff.toggleVisibility(DOMgetter.projectContainer);
});
