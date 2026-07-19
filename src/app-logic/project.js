import { ProjectDOM } from "../dom/DOMControl.js";

export class CreateProject {
  constructor(name) {
    this.name = name;
    this.todos = [];
    CreateProject.projects.push(this);
  }
  static projects = [];
}

const defaultProject = new CreateProject("Default");
const proj2 = new CreateProject("Waslsdasd");
const proj3 = new CreateProject("asdaad");
ProjectDOM.listProject(defaultProject.name);
ProjectDOM.listProject(proj2.name);
ProjectDOM.listProject(proj3.name);
ProjectDOM.displayProject(defaultProject);

const projForm = document.querySelector("#project-form");
projForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector("#add-project");
  const project = new CreateProject(input.value);
  ProjectDOM.listProject(project.name);
  input.value = "";
})

export default CreateProject.projects;