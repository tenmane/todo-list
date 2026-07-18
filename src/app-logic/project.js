import { DOMStuff } from "../dom/DOMControl.js";

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
DOMStuff.listProject(defaultProject.name);
DOMStuff.listProject(proj2.name);
DOMStuff.listProject(proj3.name);
DOMStuff.displayProject(defaultProject);

const form = document.querySelector("#project-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector("#add-project");
  const project = new CreateProject(input.value);
  DOMStuff.listProject(project.name);
  input.value = "";
})

export default CreateProject.projects;