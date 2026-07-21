import { ProjectDOM } from "../dom/DOMControl.js";
import { saveProject } from "./local-storage.js";

export class CreateProject {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.id = crypto.randomUUID();
    CreateProject.projects.push(this);
  }
  static projects = [];
}

const projectsQuantity = JSON.parse(localStorage.getItem("projects") || []);
if (projectsQuantity.length === 0) {
  const defaultProject = new CreateProject("Default");
  ProjectDOM.listProject(defaultProject.name);
  ProjectDOM.displayProject(defaultProject);
}

const projForm = document.querySelector("#project-form");
projForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector("#add-project");
  const project = new CreateProject(input.value);
  ProjectDOM.listProject(project.name);
  input.value = "";
  saveProject(CreateProject.projects);
})

export default CreateProject.projects;