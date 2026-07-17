import { DOMStuff } from "../dom/DOMControl.js";

class CreateProject {
  constructor(name) {
    this.name = name;
    this.todos = [];
    CreateProject.projects.push(this);
  }
  static projects = [];
}

const defaultProject = new CreateProject("Default");
const proj2 = new CreateProject("Yer");
const proj3 = new CreateProject("Yer");
DOMStuff.listProject(defaultProject.name);
DOMStuff.listProject(proj2.name);
DOMStuff.listProject(proj3.name);

export default CreateProject.projects;