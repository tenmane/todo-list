import { DOMStuff } from "../dom/DOMControl.js";

class createProject {
  constructor(name) {
    this.name = name;
  }
  addProject() {
    DOMStuff.addProject(this.name);
  }
}

const defaultProject = new createProject("Default");
defaultProject.addProject();